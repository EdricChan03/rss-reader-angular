(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{dGa1:function(e,t,n){"use strict";n.r(t),n.d(t,"ReleaseNotesModule",(function(){return k}));var s=n("An66"),c=n("h1zE"),o=n("i9Na"),r=n("1VvW"),i=n("kZht"),a=n("+EvI"),b=n("AytR");function l(e,t){if(1&e&&(i.Qb(0,"span"),i.Bc(1),i.Pb()),2&e){const e=t.ngIf;i.zb(1),i.Dc(" - ",e,"")}}function f(e,t){if(1&e&&(i.Qb(0,"p"),i.Bc(1,"Release date: "),i.Qb(2,"em"),i.Qb(3,"time",8),i.Bc(4),i.dc(5,"date"),i.Pb(),i.Pb(),i.Pb()),2&e){const e=t.ngIf;i.zb(3),i.jc("dateTime",e),i.zb(1),i.Cc(i.fc(5,2,e,"short"))}}function g(e,t){if(1&e&&(i.Qb(0,"p"),i.Bc(1,"Released by: "),i.Qb(2,"em"),i.Bc(3),i.Pb(),i.Pb()),2&e){const e=t.ngIf;i.zb(3),i.Cc(e)}}function u(e,t){if(1&e&&(i.Ob(0),i.Qb(1,"p"),i.Bc(2,"See this "),i.Qb(3,"a",9),i.Bc(4,"link"),i.Pb(),i.Bc(5," for the release notes."),i.Pb(),i.Nb()),2&e){const e=i.cc().ngIf;i.zb(3),i.jc("href",e,i.uc)}}function p(e,t){if(1&e&&(i.Ob(0),i.Mb(1,"p",10),i.dc(2,"markdown"),i.Nb()),2&e){const e=i.cc().ngIf,t=i.cc(2);i.zb(1),i.jc("innerHTML",i.ec(2,1,t.joinReleaseNotes(e)),i.sc)}}function z(e,t){if(1&e&&(i.Ob(0),i.zc(1,u,6,1,"ng-container",4),i.zc(2,p,3,3,"ng-container",4),i.Nb()),2&e){const e=t.ngIf,n=i.cc(2);i.zb(1),i.jc("ngIf",n.isUrl(e)),i.zb(1),i.jc("ngIf",n.isArray(e))}}function h(e,t){if(1&e&&(i.Ob(0),i.zc(1,f,6,5,"p",4),i.zc(2,g,4,1,"p",4),i.zc(3,z,3,2,"ng-container",4),i.Nb()),2&e){const e=i.cc();i.zb(1),i.jc("ngIf",e.getReleaseDate(e.releaseNotes.latestVersion)),i.zb(1),i.jc("ngIf",e.getReleaseAuthor(e.releaseNotes.latestVersion)),i.zb(1),i.jc("ngIf",e.getReleaseNote(e.releaseNotes.latestVersion))}}function N(e,t){1&e&&(i.Qb(0,"h2",11),i.Bc(1,"All release notes"),i.Pb())}function d(e,t){if(1&e&&(i.Qb(0,"span"),i.Bc(1),i.Pb()),2&e){const e=t.ngIf;i.zb(1),i.Dc(" - ",e,"")}}function I(e,t){1&e&&(i.Qb(0,"mat-chip",15),i.Bc(1,"Latest"),i.Pb())}function R(e,t){if(1&e&&(i.Qb(0,"p"),i.Bc(1,"Release date: "),i.Qb(2,"em"),i.Qb(3,"time",8),i.Bc(4),i.dc(5,"date"),i.Pb(),i.Pb(),i.Pb()),2&e){const e=t.ngIf;i.zb(3),i.jc("dateTime",e),i.zb(1),i.Cc(i.fc(5,2,e,"short"))}}function m(e,t){if(1&e&&(i.Qb(0,"p"),i.Bc(1,"Released by: "),i.Qb(2,"em"),i.Bc(3),i.Pb(),i.Pb()),2&e){const e=t.ngIf;i.zb(3),i.Cc(e)}}function j(e,t){if(1&e&&(i.Ob(0),i.Qb(1,"p"),i.Bc(2,"See this "),i.Qb(3,"a",9),i.Bc(4,"link"),i.Pb(),i.Bc(5," for the release notes."),i.Pb(),i.Nb()),2&e){const e=i.cc().ngIf;i.zb(3),i.jc("href",e,i.uc)}}function P(e,t){if(1&e&&(i.Ob(0),i.Mb(1,"p",10),i.dc(2,"markdown"),i.Nb()),2&e){const e=i.cc().ngIf,t=i.cc(3);i.zb(1),i.jc("innerHTML",i.ec(2,1,t.joinReleaseNotes(e)),i.sc)}}function Q(e,t){if(1&e&&(i.Ob(0),i.zc(1,j,6,1,"ng-container",4),i.zc(2,P,3,3,"ng-container",4),i.Nb()),2&e){const e=t.ngIf,n=i.cc(3);i.zb(1),i.jc("ngIf",n.isUrl(e)),i.zb(1),i.jc("ngIf",n.isArray(e))}}function B(e,t){if(1&e&&(i.Ob(0),i.Qb(1,"h3",13),i.Bc(2),i.zc(3,d,2,1,"span",4),i.zc(4,I,2,0,"mat-chip",14),i.Pb(),i.zc(5,R,6,5,"p",4),i.zc(6,m,4,1,"p",4),i.zc(7,Q,3,2,"ng-container",4),i.Nb()),2&e){const e=t.$implicit,n=i.cc(2);i.zb(1),i.lc("id","version-",e,""),i.zb(1),i.Dc(" Version ",e,""),i.zb(1),i.jc("ngIf",n.getReleaseName(e)),i.zb(1),i.jc("ngIf",e===n.releaseNotes.latestVersion),i.zb(1),i.jc("ngIf",n.getReleaseDate(e)),i.zb(1),i.jc("ngIf",n.getReleaseAuthor(e)),i.zb(1),i.jc("ngIf",n.getReleaseNote(e))}}function v(e,t){if(1&e&&(i.Ob(0),i.zc(1,B,8,7,"ng-container",12),i.Nb()),2&e){const e=i.cc();i.zb(1),i.jc("ngForOf",e.versions.slice().reverse())}}function y(e,t){1&e&&(i.Qb(0,"div",16),i.Qb(1,"h2",17),i.Bc(2,"No release notes available!"),i.Pb(),i.Qb(3,"p"),i.Bc(4,"Are you connected to the internet?"),i.Pb(),i.Pb())}const w=new i.q("Release notes JSON file",{providedIn:"root",factory:()=>a}),A=new i.q("Custom Git repository"),O=[{path:"",component:(()=>{class e{constructor(e,t){this.releaseNotesJson=e,this.customGitRepo=t}get releaseNotes(){return this.releaseNotesJson}get versions(){return Object.keys(this.releaseNotes.releases)}get gitRepo(){return this.createGitRepoUrl(this.customGitRepo?this.customGitRepo:this.releaseNotes.gitRepo?this.releaseNotes.gitRepo:b.a.gitRepoDefaults)}createGitRepoUrl(e){return"object"==typeof e?`${e.host}/${e.username}/${e.repo}`:e}getReleaseName(e){return this.releaseNotes.releases[e].releaseName}getReleaseNote(e){return this.releaseNotes.releases[e].releaseNotes}getReleaseDate(e){return this.releaseNotes.releases[e].releaseDate}getReleaseAuthor(e){return this.releaseNotes.releases[e].releaseAuthor}getReleaseInfo(e){return this.releaseNotes.releases[e]}joinReleaseNotes(e){return e.join("\n")}isArray(e){return Array.isArray(e)}isUrl(e){return/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(e)}}return e.\u0275fac=function(t){return new(t||e)(i.Lb(w),i.Lb(A,8))},e.\u0275cmp=i.Fb({type:e,selectors:[["app-release-notes"]],decls:14,vars:8,consts:[[1,"app-content"],["id","app-header"],["id","current-version"],["id","current-version-release-notes"],[4,"ngIf"],[4,"ngIf","ngIfElse"],["id","all-release-notes",4,"ngIf"],["noReleaseNotes",""],[3,"dateTime"],[3,"href"],[3,"innerHTML"],["id","all-release-notes"],[4,"ngFor","ngForOf"],[3,"id"],["color","primary",4,"ngIf"],["color","primary"],[1,"center"],["id","no-release-notes-available"]],template:function(e,t){if(1&e&&(i.Qb(0,"div",0),i.Qb(1,"h1",1),i.Bc(2,"Release notes"),i.Pb(),i.Qb(3,"h2",2),i.Bc(4),i.Pb(),i.Qb(5,"h3",3),i.Bc(6),i.zc(7,l,2,1,"span",4),i.Pb(),i.zc(8,h,4,3,"ng-container",5),i.Mb(9,"hr"),i.zc(10,N,2,0,"h2",6),i.zc(11,v,2,1,"ng-container",5),i.Pb(),i.zc(12,y,5,0,"ng-template",null,7,i.Ac)),2&e){const e=i.pc(13);i.zb(4),i.Dc("Current version: ",t.releaseNotes.latestVersion,""),i.zb(2),i.Dc("Release notes for ",t.releaseNotes.latestVersion,""),i.zb(1),i.jc("ngIf",t.getReleaseName(t.releaseNotes.latestVersion)),i.zb(1),i.jc("ngIf",t.versions)("ngIfElse",e),i.zb(2),i.jc("ngIf",(null==t.versions?null:t.versions.length)>0),i.zb(1),i.jc("ngIf",t.versions)("ngIfElse",e)}},directives:[s.m,s.l,c.a],pipes:[s.e,o.b],encapsulation:2}),e})()}];let D=(()=>{class e{}return e.\u0275mod=i.Jb({type:e}),e.\u0275inj=i.Ib({factory:function(t){return new(t||e)},imports:[[r.f.forChild(O)],r.f]}),e})();const V=[c.c];let k=(()=>{class e{}return e.\u0275mod=i.Jb({type:e}),e.\u0275inj=i.Ib({factory:function(t){return new(t||e)},imports:[[s.c,o.a.forChild(),V,D]]}),e})()}}]);