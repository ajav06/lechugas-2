export const proveedorResource = (resource: any) => ({
  id: resource.id,
  nombre: resource.nombre,
  url: resource.url,
  img: resource.img,
  activo: resource.activo
})

export const proveedorlist = (resources: any) =>
  resources.map((resource: any) => proveedorResource(resource))
