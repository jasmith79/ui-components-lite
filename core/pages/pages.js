/*
 * pages.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * Pages manages an element with one or more ui-component-page children. NOTE: pages can *only* be
 * dynamically added by the method or the handling won't work correctly. Simplicity over features.
 */

 import { CoreElementMixin, extractType } from 'core';
 import Page from 'page';

 const PagesMethods = {
   addPage (pg) {
     this.pages.push(Page(pg));
     this.appendChild(pg);
     return this;
   },

   unselect (page) {
     page.removeAttribute('selected');
     if (page.isOpen) page.close();
     this.selectedPage = null;
     return this;
   },

   unselectAll (except) {
     let pgs = except ? this.pages.filter(pg => pg !== except) : this.pages;
     pgs.forEach(page => this.unselect(page));
     this.selectedPage = except || null;
     return this;
   },

   select (pg) {
     if (extractType(pg) === 'Number') {
       let page = this.pages[pg];
       if (page) {
         page.setAttribute('selected', '');
         this.unselectAll(page)._history.push(pg);
         page.open();
       } else {
         this.selectedPage = null;
         console.warn('Tried to select non-existant page.');
       }
       return this;
     } else {
       return this.select(this.pages.indexOf(pg));
     }
   }
 };

 const Pages = function Pages(elem) {
   let el = elem || document.createElement('div');
   el.classList.add('ui-component-pages');
   el._history = [];
   el.pages = Array.from(el.querySelectorAll('.ui-component-page'));
   Object.assign(el, CoreElementMixin, PagesMethods);
   el.pages.forEach((pg, i) => {
     pg._parentUIComponent = el;
     if (pg.getAttribute('selected') != null) {
       el.select(i);
     } else {
       pg.close();
     }

     pg.addEventListener('page-closed', evt => {
       el.unselect(pg);
       if (evt.detail && evt.detail.userInit) el._history.pop();

       // if all pages are closed, we want to select the last page or the default
       setTimeout(_ => {
         if (!el.selectedPage) {
           let last = el._history.pop();
           if (last) {
             el.select(last);
           } else {
             el.select(el.pages[0]);
           }
         }
       }, 10);
     });
   });
   if (!el.selectedPage) {
     el.select(el.pages[0]);
   }
   return el;
 };

 // initialize any pages elements in DOM
 document.querySelectorAll('.ui-component-pages').forEach(Pages);

 export default Pages;