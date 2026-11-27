const frontend=process.env.FRONTEND_URL?.replace(/\/$/,'');
const api=process.env.API_URL?.replace(/\/$/,'');
if(!frontend?.startsWith('https://')||!api?.startsWith('https://')){
 console.error('Configura FRONTEND_URL y API_URL (HTTPS).');process.exit(1);
}
async function check(url,html){
 const r=await fetch(url,{signal:AbortSignal.timeout(30000)});
 if(!r.ok)throw new Error(url+' responde '+r.status);
 if(html){
   if(!(r.headers.get('content-type')??'').includes('text/html'))throw new Error(url+' no ofrece HTML');
 } else {
   const data=await r.json();
   if(data?.data?.status!=='up')throw new Error(url+' no reporta status up');
 }
 console.log('✓',url);
}
try{
 for(const route of ['/','/login','/register','/tasks','/tasks/id-inexistente']){
   await check(frontend+route,true);
 }
 for(const route of ['/health','/health/database'])await check(api+route,false);
 console.log('Prueba de humo terminada; CRUD requiere comprobación manual.');
}catch(error){console.error('Falló:',error instanceof Error?error.message:'error desconocido');process.exitCode=1;}
