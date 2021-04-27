export const dolarResource = (resource: any) => ({
  id: resource.id,
  id_proveedor: resource.id_proveedor,
  precio: resource.precio,
  fecha: resource.fecha
})

export const dolarlist = (resources: any) =>
  resources.map((resource: any) => dolarResource(resource))
