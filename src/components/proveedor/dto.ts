export const proveedorResource = (resource: any) => ({
  id: resource._id,
  name: resource.name,
  type: resource.type,
  price: resource.price,
  createdAt: resource.createdAt,
  finalitAt: resource.finalitAt,
  status: resource.status
})

export const proveedorlist = (resources: any) =>
  resources.map((resource: any) => proveedorResource(resource))
