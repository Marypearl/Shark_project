(()=>{"use strict";var e={712:(e,t)=>{var a;Object.defineProperty(t,"__esModule",{value:!0}),t.textMimeTypes=t.CellOutputMimeTypes=t.NotebookCellKindCode=t.NotebookCellKindMarkup=t.JUPYTER_NOTEBOOK_MARKDOWN_SELECTOR=t.ATTACHMENT_CLEANUP_COMMANDID=t.defaultNotebookFormat=void 0,t.defaultNotebookFormat={major:4,minor:2},t.ATTACHMENT_CLEANUP_COMMANDID="ipynb.cleanInvalidImageAttachment",t.JUPYTER_NOTEBOOK_MARKDOWN_SELECTOR={notebookType:"jupyter-notebook",language:"markdown"},t.NotebookCellKindMarkup=1,t.NotebookCellKindCode=2,function(e){e.error="application/vnd.code.notebook.error",e.stderr="application/vnd.code.notebook.stderr",e.stdout="application/vnd.code.notebook.stdout"}(a||(t.CellOutputMimeTypes=a={})),t.textMimeTypes=["text/plain","text/markdown","text/latex",a.stderr,a.stdout]},624:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createJupyterCellFromNotebookCell=n,t.sortObjectPropertiesRecursively=u,t.getCellMetadata=d,t.getVSCodeCellLanguageId=function(e){return e.metadata?.vscode?.languageId},t.setVSCodeCellLanguageId=s,t.removeVSCodeCellLanguageId=i,t.createMarkdownCellFromNotebookCell=y,t.pruneCell=_,t.serializeNotebookToString=function(e){const t=k(e),a=t.metadata?.language_info?.name??e.cells.find((e=>2===e.kind))?.languageId;t.cells=e.cells.map((e=>n(e,a))).map(_);return function(e,t){const a=u(e);return JSON.stringify(a,void 0,t)+"\n"}(t,e.metadata&&"indentAmount"in e.metadata&&"string"==typeof e.metadata.indentAmount?e.metadata.indentAmount:" ")},t.getNotebookMetadata=k;const o=a(712),r=new TextDecoder;function n(e,t){let a;return a=e.kind===o.NotebookCellKindMarkup?y(e):"raw"===e.languageId?function(e){const t=d({cell:e}),a={cell_type:"raw",source:l(e.value.replace(/\r\n/g,"\n")),metadata:t?.metadata||{}};return t?.attachments&&(a.attachments=t.attachments),t?.id&&(a.id=t.id),a}(e):function(e,t){const a=JSON.parse(JSON.stringify(d({cell:e})));a.metadata=a.metadata||{},e.languageId!==t?s(a,e.languageId):i(a);const o={cell_type:"code",execution_count:a.execution_count??null,source:l(e.value.replace(/\r\n/g,"\n")),outputs:(e.outputs||[]).map(c),metadata:a.metadata};return a?.id&&(o.id=a.id),o}(e,t),a}function u(e){return Array.isArray(e)?e.map(u):null!=e&&"object"==typeof e&&Object.keys(e).length>0?Object.keys(e).sort().reduce(((t,a)=>(t[a]=u(e[a]),t)),{}):e}function d(e){if("cell"in e){const t=e.cell,a={execution_count:null,...t.metadata??{}};return t.kind===o.NotebookCellKindMarkup&&delete a.execution_count,a}return{...e.metadata??{}}}function s(e,t){e.metadata=e.metadata||{},e.metadata.vscode={languageId:t}}function i(e){e.metadata?.vscode&&delete e.metadata.vscode}function l(e){if(Array.isArray(e))return e;const t=e.toString();if(t.length>0){const e=t.split("\n");return e.map(((t,a)=>a<e.length-1?`${t}\n`:t)).filter((e=>e.length>0))}return[]}function c(e){const t=e.metadata;let a;const r=t?.outputType;switch(r){case"error":a=m(e);break;case"stream":a=p(e);break;case"display_data":a={output_type:"display_data",data:e.items.reduce(((e,t)=>(e[t.mime]=f(t.mime,t.data),e)),{}),metadata:t?.metadata||{}};break;case"execute_result":a={output_type:"execute_result",data:e.items.reduce(((e,t)=>(e[t.mime]=f(t.mime,t.data),e)),{}),metadata:t?.metadata||{},execution_count:"number"==typeof t?.executionCount?t?.executionCount:null};break;case"update_display_data":a={output_type:"update_display_data",data:e.items.reduce(((e,t)=>(e[t.mime]=f(t.mime,t.data),e)),{}),metadata:t?.metadata||{}};break;default:{const r=1===e.items.length&&e.items.every((e=>e.mime===o.CellOutputMimeTypes.error)),n=e.items.every((e=>e.mime===o.CellOutputMimeTypes.stderr||e.mime===o.CellOutputMimeTypes.stdout));if(r)return m(e);const u=t?.outputType||(n?"stream":"display_data");let d;d="stream"===u?p(e):"display_data"===u?{data:{},metadata:{},output_type:"display_data"}:{output_type:u},t?.metadata&&(d.metadata=t.metadata),e.items.length>0&&(d.data=e.items.reduce(((e,t)=>(e[t.mime]=f(t.mime,t.data),e)),{})),a=d;break}}return a&&t&&t.transient&&(a.transient=t.transient),a}function m(e){const t=e.items[0];if(!t.data)return{output_type:"error",ename:"",evalue:"",traceback:[]};const a=e.metadata?.originalError,o=JSON.parse(r.decode(t.data));return{output_type:"error",ename:o.name,evalue:o.message,traceback:a?.traceback||l(o.stack||o.message||"")}}function p(e){const t=[];e.items.filter((e=>e.mime===o.CellOutputMimeTypes.stderr||e.mime===o.CellOutputMimeTypes.stdout)).map((e=>r.decode(e.data))).forEach((e=>{const a=e.split("\n");t.length&&a.length&&a[0].length>0&&(t[t.length-1]=`${t[t.length-1]}${a.shift()}`);for(const e of a)t.push(e)}));for(let e=0;e<t.length-1;e++)t[e]=`${t[e]}\n`;t.length&&0===t[t.length-1].length&&t.pop();const a=function(e){if(e.items.length>0)return e.items[0].mime===o.CellOutputMimeTypes.stderr?"stderr":"stdout"}(e)||"stdout";return{output_type:"stream",name:a,text:t}}function f(e,t){if(!t)return"";try{if(e===o.CellOutputMimeTypes.error){const e=r.decode(t);return JSON.parse(e)}if(e.startsWith("text/")||o.textMimeTypes.includes(e))return l(r.decode(t));if(e.startsWith("image/")&&"image/svg+xml"!==e)return"undefined"!=typeof Buffer&&"function"==typeof Buffer.from?Buffer.from(t).toString("base64"):btoa(t.reduce(((e,t)=>e+String.fromCharCode(t)),""));if(e.toLowerCase().includes("json")){const e=r.decode(t);return e.length>0?JSON.parse(e):e}return"image/svg+xml"===e?l(r.decode(t)):r.decode(t)}catch(e){return""}}function y(e){const t=d({cell:e}),a={cell_type:"markdown",source:l(e.value.replace(/\r\n/g,"\n")),metadata:t?.metadata||{}};return t?.attachments&&(a.attachments=t.attachments),t?.id&&(a.id=t.id),a}function _(e){const t={...e,source:l(e.source)};return"code"!==t.cell_type?(delete t.outputs,delete t.execution_count):t.outputs=t.outputs?t.outputs.map(b):[],t}const g={stream:new Set(Object.keys({output_type:"stream",name:"stdout",text:""})),error:new Set(Object.keys({output_type:"error",ename:"",evalue:"",traceback:[""]})),display_data:new Set(Object.keys({output_type:"display_data",data:{},metadata:{}})),execute_result:new Set(Object.keys({output_type:"execute_result",name:"",execution_count:0,data:{},metadata:{}}))};function b(e){let t;switch(e.output_type){case"stream":case"error":case"execute_result":case"display_data":t=g[e.output_type];break;default:return e}const a={...e};for(const o of Object.keys(e))t.has(o)||delete a[o];return a}function k(e){const t=e.metadata||{},a={};return a.cells=t.cells||[],a.nbformat=t.nbformat||o.defaultNotebookFormat.major,a.nbformat_minor=t.nbformat_minor??o.defaultNotebookFormat.minor,a.metadata=t.metadata||{},a}},167:e=>{e.exports=require("worker_threads")}},t={};function a(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,a),n.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0});const t=a(167),r=a(624);t.parentPort&&t.parentPort.on("message",(({id:e,data:a})=>{if(t.parentPort){const o=(0,r.serializeNotebookToString)(a),n=(new TextEncoder).encode(o);t.parentPort.postMessage({id:e,data:n})}}))})();var r=exports;for(var n in o)r[n]=o[n];o.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/2fc07b811f760549dab9be9d2bedd06c51dfcb9a/extensions/ipynb/dist/notebookSerializerWorker.js.map