(function(){
'use strict';
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return[].slice.call((c||d).querySelectorAll(s))};
d.documentElement.classList.add('js');
$('#year').textContent=new Date().getFullYear();

/* Mobile menu */
var burger=$('#burger'),menu=$('#menu');
function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')}
burger.addEventListener('click',function(){setMenu(!menu.classList.contains('open'))});
menu.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false)}});
addEventListener('scroll',function(){$('#nav').classList.toggle('stuck',scrollY>10)},{passive:true});

/* Scroll reveal + active link */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
$$('.rv').forEach(function(el){io.observe(el)});
var links=$$('.menu a[href^="#"]');
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(function(s){so.observe(s)});

/* Count-up stats */
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var co=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;co.unobserve(e.target);
  var el=e.target,n=+el.dataset.count,s=el.dataset.suffix||'';
  if(reduce){el.textContent=n+s;return}
  var t0=performance.now();(function f(t){var p=Math.min((t-t0)/1200,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+(p<1?'':s);if(p<1)requestAnimationFrame(f)})(t0);
})},{threshold:.6});
$$('[data-count]').forEach(function(el){co.observe(el)});

/* Lightbox (projects + certificates) */
var lb=$('#lb'),lbi=$('#lb-img');
$$('[data-zoom]').forEach(function(b){b.addEventListener('click',function(){lbi.src=b.dataset.zoom;lbi.alt=b.dataset.alt||'';lb.showModal()})});
$('#lb-x').addEventListener('click',function(){lb.close()});
lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});

/* Toast */
var toast=$('#toast'),tt;
function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},4500)}

/* PDF download: only works once the file exists in /assets */
$$('[data-pdf]').forEach(function(a){a.addEventListener('click',function(e){
  e.preventDefault();
  fetch(a.href,{method:'HEAD'}).then(function(r){
    if(!r.ok)throw 0;
    var l=d.createElement('a');l.href=a.href;l.download='Mohamed-Imaam-Portfolio.pdf';d.body.appendChild(l);l.click();l.remove();
  }).catch(function(){say('Portfolio PDF is not uploaded yet. Please email imaammohamed6@gmail.com to request it.')});
})});

/* Service buttons prefill the subject */
$$('[data-subject]').forEach(function(a){a.addEventListener('click',function(){$('#subject').value='Enquiry: '+a.dataset.subject})});

/* Contact form: Formspree (or compatible) if data-endpoint is set, otherwise opens email app */
var form=$('#form'),st=$('#status');
form.addEventListener('submit',function(e){
  e.preventDefault();st.className='status';
  var bad=null;
  $$('input,textarea',form).forEach(function(f){
    var ok=f.value.trim()&&(f.type!=='email'||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
    f.setAttribute('aria-invalid',!ok);if(!ok&&!bad)bad=f;
  });
  if(bad){st.textContent='Please complete every field with valid details.';st.classList.add('err');bad.focus();return}
  var ep=form.dataset.endpoint,data=new FormData(form);
  if(!ep){
    var q='subject='+encodeURIComponent(data.get('subject'))+'&body='+encodeURIComponent(data.get('message')+'\n\nFrom: '+data.get('name')+' ('+data.get('email')+')');
    location.href='mailto:imaammohamed6@gmail.com?'+q;
    st.textContent='Opening your email app. The form service is not connected yet.';return;
  }
  st.textContent='Sending...';
  fetch(ep,{method:'POST',body:data,headers:{Accept:'application/json'}}).then(function(r){
    if(!r.ok)throw 0;form.reset();st.textContent='Message sent. Thank you, I will reply soon.';st.classList.add('ok');
  }).catch(function(){st.textContent='Message could not be sent. Please email imaammohamed6@gmail.com directly.';st.classList.add('err')});
});
})();
