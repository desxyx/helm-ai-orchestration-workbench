const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const {createRequire}=require('node:module');
const native=createRequire(path.join(process.cwd(),'package.json'));
const {chromium}=native('playwright');
const {load,logger}=native('./test/core06-fixtures/harness');
const copy=native('./src/adapters/copyCapture');
// Attribute names and depths mirror the independently reviewed live observation.
// No real turn identity, provider HTML, filename or response content is included.
const button=(id,explicit=false)=>'<button id="'+id+'" aria-label="Copy"'+(explicit?' data-testid="copy-turn-action-button"':'')+'>Copy</button>';
const code=(id='code-copy')=>'<div data-markdown-copy data-search-result-target data-theme><div data-markdown-copy><div><div><span data-state>'+button(id)+'</span></div></div></div><pre><code>synthetic code</code></pre></div>';
const answer=(id='answer-copy',explicit=false)=>'<div><div data-talvt-turn-state><div><div><span data-state>'+button(id,explicit)+'</span></div></div></div></div>';
const turn=(body,key='fixture')=>'<section data-turn-key="'+key+'"><h4 data-conversation-role="assistant" hidden>Assistant</h4><div>synthetic prose</div>'+body+'</section>';
const chat=()=>load('src/adapters/chatgpt.js',{overrides:{'../utils/logger':logger()},expose:'module.exports={scope:CHATGPT_REPLY_SCOPE,readReplyState,probeReplyFinished};'}).api;
let browser;
test.before(async()=>{browser=await chromium.launch({headless:true}).catch(()=>chromium.launch({channel:'chrome',headless:true}));});
test.after(async()=>await browser?.close());
async function local(html,run,{capture=false}={}){
 const context=await browser.newContext({offline:true});await context.route('**/*',r=>r.abort());
 try{
  const page=await context.newPage();await page.setContent(html);await page.evaluate(()=>{
   window.actions={copy:0,codeCopy:0,hover:0,scroll:0,paste:0,send:0,clipboardWrites:0,clipboardReads:0};
   document.addEventListener('mouseover',()=>window.actions.hover++);window.addEventListener('scroll',()=>window.actions.scroll++,true);document.addEventListener('paste',()=>window.actions.paste++);
   let clipboard='synthetic initial state';const full='Full native prose\n```py\nprint(1)\n```\n```js\nreturn 2;\n```';
   Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.actions.clipboardWrites++;clipboard=text;},readText:async()=>{window.actions.clipboardReads++;return clipboard;}}});
   document.querySelectorAll('button').forEach(node=>node.onclick=()=>{window.actions.copy++;if(node.closest('[data-markdown-copy]')){window.actions.codeCopy++;clipboard='code fragment only';}else clipboard=full;});
  });
  await run(page,chat());const a=await page.evaluate(()=>window.actions);
  assert.equal(a.paste,0);assert.equal(a.send,0);assert.equal(a.scroll,0);assert.equal(a.codeCopy,0);
  if(capture){assert.equal(a.copy,1);assert.equal(a.clipboardWrites,1);assert.equal(a.clipboardReads,1);}
  else{assert.equal(a.copy,0);assert.equal(a.hover,0);assert.equal(a.clipboardWrites,0);assert.equal(a.clipboardReads,0);}
 }finally{await context.close();}
}
async function chosen(page,scope,id='answer-copy'){
 assert.equal((await copy.readLatestTurnState(page,scope)).copyAttached,true);
 const loc=await copy.locateLatestTurnCopyButton(page,scope);assert.equal(await loc.count(),1);assert.equal(await loc.getAttribute('id'),id);return loc;
}
async function refused(page,scope){
 assert.equal((await copy.readLatestTurnState(page,scope)).copyAttached,false);
 assert.equal(await(await copy.locateLatestTurnCopyButton(page,scope)).count(),0);
}
for(const order of ['code-first','answer-first'])test('CP1 '+order+': observed header Copy plus action-bar Copy captures only full native reply',async()=>{
 await local(turn(order==='code-first'?code()+answer():answer()+code()),async(p,a)=>{
  assert.equal(await p.locator('button').count(),2);assert.equal(await p.locator('#code-copy').evaluate(node=>!!node.closest('pre,code')),false);
  const loc=await chosen(p,a.scope);const result=await copy.clickCopyAndRead(p,p.locator('section'),loc);
  assert.equal(result,'Full native prose\n```py\nprint(1)\n```\n```js\nreturn 2;\n```');
 },{capture:true});
});
test('CP1 reply without code keeps the unique native action unchanged',async()=>{await local(turn(answer()),(p,a)=>chosen(p,a.scope));});
test('CP1 two action-bar-style buttons remain ambiguous even with one explicit full-turn test-id',async()=>{
 await local(turn(code()+answer('answer-copy',true)+answer('second-answer')),async(p,a)=>refused(p,a.scope));
});
test('CP1 code-header Copy alone never becomes whole-reply Copy',async()=>{await local(turn(code()),(p,a)=>refused(p,a.scope));});
test('CP1 literal pre/code exclusion remains in addition to header exclusion',async()=>{
 await local(turn('<pre><code>'+button('literal-code')+'</code></pre>'+code()+answer()),(p,a)=>chosen(p,a.scope));
});
test('CP1 previous-turn Copy cannot supply a missing latest-turn action',async()=>{
 await local(turn(answer('previous'),'old')+turn(code(),'latest'),(p,a)=>refused(p,a.scope));
});
test('CP1 user-message Copy stays excluded after assistant anchor',async()=>{
 await local(turn('<div class="group/user-message">'+button('user-copy')+'</div>'+code()+answer()),(p,a)=>chosen(p,a.scope));
});
test('CP1 global later Copy never substitutes for latest-turn Copy',async()=>{
 await local(turn(code())+answer('global'),(p,a)=>refused(p,a.scope));
});
test('CP1 completion read and probe use scoped full-answer Copy with zero hover/scroll/actions',async()=>{
 await local(turn(code()+answer()),async(p,a)=>{assert.match((await a.readReplyState(p)).text,/^copy_ready:latest:/);assert.equal(await a.probeReplyFinished(p),true);});
});
test('CP1 explicit full-turn test-id is retained as the unique native target',async()=>{
 await local(turn(code()+answer('explicit-answer',true)),(p,a)=>chosen(p,a.scope,'explicit-answer'));
});
test('CP1 unknown code-container markers do not disambiguate two controls',async()=>{
 await local(turn('<div data-unknown-copy>'+button('unknown')+'</div>'+answer()),(p,a)=>refused(p,a.scope));
});
test('CP1 excluded ancestor search stops at the current turn boundary',async()=>{
 await local('<div data-markdown-copy>'+turn(answer())+'</div>',(p,a)=>chosen(p,a.scope));
});
test('CP1 disabled unique action still fails readiness',async()=>{
 await local(turn(code()+answer()),async(p,a)=>{await p.locator('#answer-copy').evaluate(node=>node.disabled=true);const loc=await copy.locateLatestTurnCopyButton(p,a.scope);assert.equal(await copy.probeCopyReady(loc),false);});
});
test('CP1 re-render clears an old marked Copy and resolves only the new action',async()=>{
 await local(turn(code()+answer()),async(p,a)=>{
  await chosen(p,a.scope);await p.locator('#answer-copy').evaluate(node=>node.remove());await refused(p,a.scope);
  await p.locator('section').evaluate(node=>{node.insertAdjacentHTML('beforeend','<div data-talvt-turn-state><button id="replacement" aria-label="Copy">Copy</button></div>');});await chosen(p,a.scope,'replacement');
 });
});
for(const provider of ['claude','gemini'])test('CP1 '+provider+' has no header-exclusion opt-in or changed unique-Copy rule',async()=>{
 const scope=load('src/adapters/'+provider+'.js',{overrides:{'../utils/logger':logger()},expose:'module.exports='+provider.toUpperCase()+'_REPLY_SCOPE;'}).api;assert.equal(scope.excludedCopyAncestorSelector,undefined);
 const html=provider==='claude'?'<div><div data-testid="assistant-message">reply</div><div data-testid="message-actions" role="toolbar"><button data-testid="action-bar-copy" aria-label="Copy">Copy</button></div></div>':'<model-response><message-content>reply</message-content><message-actions><copy-button><button aria-label="Copy">Copy</button></copy-button></message-actions></model-response>';
 await local(html,async p=>{assert.equal((await copy.readLatestTurnState(p,scope)).copyAttached,true);assert.equal(await(await copy.locateLatestTurnCopyButton(p,scope)).count(),1);});
});
