/*
Converte imagens de src/assets para public/assets em webp/avif.
Ajuste paths conforme seu projeto.
*/
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const srcDir = 'src/assets';
const outDir = 'public/assets';

if (!fs.existsSync(srcDir)) {
  console.warn(`Diretório de origem não encontrado: ${srcDir}`);
  process.exit(0);
}

if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true});
fs.readdirSync(srcDir).forEach(file=>{
  const ext = path.extname(file).toLowerCase();
  if(!['.png','.jpg','.jpeg'].includes(ext)) return;
  const name = path.basename(file,ext);
  const inPath = path.join(srcDir,file);
  sharp(inPath).avif({quality:75}).toFile(path.join(outDir, name+'.avif'));
  sharp(inPath).webp({quality:80}).toFile(path.join(outDir, name+'.webp'));
  console.log('convertido:', file);
});
