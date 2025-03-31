(()=>{"use strict";var t={653:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.DeferredPromise=void 0,e.DeferredPromise=class{get isRejected(){return 1===this.outcome?.outcome}get isResolved(){return 0===this.outcome?.outcome}get isSettled(){return!!this.outcome}get value(){return 0===this.outcome?.outcome?this.outcome?.value:void 0}constructor(){this.p=new Promise(((t,e)=>{this.completeCallback=t,this.errorCallback=e}))}complete(t){return new Promise((e=>{this.completeCallback(t),this.outcome={outcome:0,value:t},e()}))}error(t){return new Promise((e=>{this.errorCallback(t),this.outcome={outcome:1,value:t},e()}))}}},256:function(t,e,s){var r,o=this&&this.__createBinding||(Object.create?function(t,e,s,r){void 0===r&&(r=s);var o=Object.getOwnPropertyDescriptor(e,s);o&&!("get"in o?!e.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return e[s]}}),Object.defineProperty(t,r,o)}:function(t,e,s,r){void 0===r&&(r=s),t[r]=e[s]}),i=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),n=this&&this.__importStar||(r=function(t){return r=Object.getOwnPropertyNames||function(t){var e=[];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[e.length]=s);return e},r(t)},function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var s=r(t),n=0;n<s.length;n++)"default"!==s[n]&&o(e,t,s[n]);return i(e,t),e});Object.defineProperty(e,"__esModule",{value:!0}),e.activate=async function(t){if(u.env.remoteAuthority)return;const e=new g(u.l10n.t("Port Forwarding")),s=new m(e,t);t.subscriptions.push(u.commands.registerCommand("tunnel-forwarding.showLog",(()=>e.show())),u.commands.registerCommand("tunnel-forwarding.restart",(()=>s.restart())),s.onDidStateChange((t=>{u.commands.executeCommand("setContext","tunnelForwardingIsRunning",2!==t.state)})),await u.workspace.registerTunnelProvider(s,{tunnelFeatures:{elevation:!1,protocol:!0,privacyOptions:[{themeIcon:"globe",id:"public",label:u.l10n.t("Public")},{themeIcon:"lock",id:"private",label:u.l10n.t("Private")}]}}))},e.deactivate=function(){};const a=s(317),c=n(s(928)),u=n(s(398)),l=s(653),h=s(197),p=process.env.VSCODE_FORWARDING_IS_DEV?c.join(__dirname,"../../../cli/target/debug/code"):c.join(u.env.appRoot,"darwin"===process.platform?"bin":"../../bin","stable"===u.env.appQuality?"code-tunnel":"code-tunnel-insiders")+("win32"===process.platform?".exe":"");class d{constructor(t,e,s){this.remoteAddress=t,this.privacy=e,this.protocol=s,this.disposeEmitter=new u.EventEmitter,this.onDidDispose=this.disposeEmitter.event}setPortFormat(t){this.localAddress=t.replace("{port}",String(this.remoteAddress.port))}dispose(){this.disposeEmitter.fire()}}class g{constructor(t){this.label=t}show(){return this.outputChannel?.show()}clear(){this.outputChannel?.clear()}log(t,e,...s){this.outputChannel||(this.outputChannel=u.window.createOutputChannel(this.label,{log:!0}),u.commands.executeCommand("setContext","tunnelForwardingHasLog",!0)),this.outputChannel[t](e,...s)}}const f="didWarnPublic";class m{get state(){return this._state}set state(t){this._state=t,this.stateChange.fire(t)}constructor(t,e){this.logger=t,this.context=e,this.tunnels=new Set,this.stateChange=new u.EventEmitter,this._state={state:2},this.onDidStateChange=this.stateChange.event}async provideTunnel(t){if("public"===t.privacy&&!await this.consentPublicPort(t.remoteAddress.port))return;const e=new d(t.remoteAddress,t.privacy||"private","https"===t.protocol?"https":"http");switch(this.tunnels.add(e),e.onDidDispose((()=>{this.tunnels.delete(e),this.updateActivePortsIfRunning()})),this.state.state){case 3:case 2:await this.setupPortForwardingProcess();case 0:return this.updateActivePortsIfRunning(),new Promise(((t,s)=>{const r=this.stateChange.event((o=>{1===o.state?(e.setPortFormat(o.portFormat),r.dispose(),t(e)):3===o.state&&(r.dispose(),s(new Error(o.error)))}))}));case 1:return e.setPortFormat(this.state.portFormat),this.updateActivePortsIfRunning(),e}}async restart(){this.killRunningProcess(),await this.setupPortForwardingProcess(),this.updateActivePortsIfRunning()}async consentPublicPort(t){if(this.context.globalState.get(f,!1))return!0;const e=u.l10n.t("Continue"),s=u.l10n.t("Don't show again"),r=await u.window.showWarningMessage(u.l10n.t("You're about to create a publicly forwarded port. Anyone on the internet will be able to connect to the service listening on port {0}. You should only proceed if this service is secure and non-sensitive.",t),{modal:!0},e,s);if(r===e);else{if(r!==s)return!1;await this.context.globalState.update(f,!0)}return!0}isInStateWithProcess(t){return(0===this.state.state||1===this.state.state)&&this.state.process===t}killRunningProcess(){0!==this.state.state&&1!==this.state.state||(this.logger.log("info","[forwarding] no more ports, stopping forwarding CLI"),this.state.process.kill(),this.state={state:2})}updateActivePortsIfRunning(){if(0!==this.state.state&&1!==this.state.state)return;const t=[...this.tunnels].map((t=>({number:t.remoteAddress.port,privacy:t.privacy,protocol:t.protocol})));this.state.process.stdin.write(`${JSON.stringify(t)}\n`),0!==t.length||this.state.cleanupTimeout?t.length>0&&this.state.cleanupTimeout&&(clearTimeout(this.state.cleanupTimeout),this.state.cleanupTimeout=void 0):this.state.cleanupTimeout=setTimeout((()=>this.killRunningProcess()),1e4)}async setupPortForwardingProcess(){const t=await u.authentication.getSession("github",["user:email","read:org"],{createIfNone:!0});this.logger.log("info","[forwarding] starting CLI");const e=(0,a.spawn)(p,["--verbose","tunnel","forward-internal","--provider","github"],{stdio:"pipe",env:{...process.env,NO_COLOR:"1",VSCODE_CLI_ACCESS_TOKEN:t.accessToken}});this.state={state:0,process:e};const s=new l.DeferredPromise;u.window.withProgress({location:u.ProgressLocation.Notification,title:u.l10n.t({comment:['do not change link format [Show Log](command), only change the text "Show Log"'],message:"Starting port forwarding system ([Show Log]({0}))",args:["command:tunnel-forwarding.showLog"]})},(()=>s.p)),e.on("exit",(t=>{const r=`[forwarding] exited with code ${t}`;this.logger.log("info",r),s.complete(),this.isInStateWithProcess(e)&&(this.state={state:3,error:r})})),e.on("error",(t=>{this.logger.log("error",`[forwarding] ${t}`),s.complete(),this.isInStateWithProcess(e)&&(this.state={state:3,error:String(t)})})),e.stdout.pipe((0,h.splitNewLines)()).on("data",(t=>this.logger.log("info",`[forwarding] ${t}`))).resume(),e.stderr.pipe((0,h.splitNewLines)()).on("data",(t=>{try{const r=JSON.parse(t);r.port_format&&void 0!==r.port_format&&(this.state={state:1,portFormat:r.port_format,process:e,cleanupTimeout:"cleanupTimeout"in this.state?this.state.cleanupTimeout:void 0},s.complete())}catch(e){this.logger.log("error",`[forwarding] ${t}`)}})).resume(),await new Promise(((t,s)=>{e.on("spawn",t),e.on("error",s)}))}}},197:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StreamSplitter=e.splitNewLines=void 0;const r=s(203);e.splitNewLines=()=>new o("\n".charCodeAt(0));class o extends r.Transform{constructor(t){super(),this.splitter=t}_transform(t,e,s){this.buffer?this.buffer=Buffer.concat([this.buffer,t]):this.buffer=t;let r=0;for(;r<this.buffer.length;){const t=this.buffer.indexOf(this.splitter,r);if(-1===t)break;this.push(this.buffer.subarray(r,t)),r=t+1}this.buffer=r===this.buffer.length?void 0:this.buffer.subarray(r),s()}_flush(t){this.buffer&&this.push(this.buffer),t()}}e.StreamSplitter=o},398:t=>{t.exports=require("vscode")},317:t=>{t.exports=require("child_process")},928:t=>{t.exports=require("path")},203:t=>{t.exports=require("stream")}},e={},s=function s(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,s),i.exports}(256),r=exports;for(var o in s)r[o]=s[o];s.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/2fc07b811f760549dab9be9d2bedd06c51dfcb9a/extensions/tunnel-forwarding/dist/extension.js.map