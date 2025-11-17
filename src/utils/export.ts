export async function exportSvgElementAsSvg(el: SVGElement, filename = 'chart.svg'){
  const serializer = new XMLSerializer()
  const str = serializer.serializeToString(el)
  const blob = new Blob([str], {type:'image/svg+xml;charset=utf-8'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export async function exportSvgElementAsPng(el: SVGElement, filename = 'chart.png'){
  const serializer = new XMLSerializer()
  const str = serializer.serializeToString(el)
  const svg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(str)}`
  const img = new Image()
  const width = Number(el.getAttribute('width')) || el.clientWidth || 800
  const height = Number(el.getAttribute('height')) || el.clientHeight || 600
  await new Promise<void>((res,rej)=>{
    img.onload = ()=>res()
    img.onerror = ()=>rej()
    img.src = svg
  })
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = getComputedStyle(document.body).backgroundColor || '#fff'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.drawImage(await (async()=>img)(),0,0)
  canvas.toBlob((blob)=>{
    if(!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  })
}
