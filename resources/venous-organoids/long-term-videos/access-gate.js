const ACCESS_HASH='8861343815955b5d83d1244a6693f96f68e402f1a7e0aa3bc1ae2c81ee84ba7f';
const ACCESS_KEY='venous-organoids-preprint-access-v1';

function unlockPage(){
  document.documentElement.classList.remove('access-locked');
  document.querySelector('#access-gate')?.remove();
}

async function sha256(value){
  const bytes=new TextEncoder().encode(value);
  const digest=await crypto.subtle.digest('SHA-256',bytes);
  return [...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
}

if(sessionStorage.getItem(ACCESS_KEY)==='granted'){
  unlockPage();
}else{
  const gate=document.createElement('div');
  gate.id='access-gate';
  gate.innerHTML=`<form class="access-card"><p class="access-kicker">Preprint preview</p><h1>Long-term treatment videos.</h1><p>This page is temporarily password protected while the associated preprint is being prepared.</p><label for="access-password">Password</label><div class="access-entry"><input id="access-password" name="password" type="password" autocomplete="current-password" required autofocus/><button type="submit">View gallery</button></div><p class="access-error" role="alert" aria-live="polite"></p></form>`;
  document.body.append(gate);
  gate.querySelector('form').addEventListener('submit',async event=>{
    event.preventDefault();
    const input=gate.querySelector('input');
    const error=gate.querySelector('.access-error');
    const button=gate.querySelector('button');
    button.disabled=true;
    const valid=await sha256(input.value)===ACCESS_HASH;
    button.disabled=false;
    if(valid){
      sessionStorage.setItem(ACCESS_KEY,'granted');
      unlockPage();
    }else{
      error.textContent='Incorrect password. Please try again.';
      input.value='';
      input.focus();
    }
  });
}
