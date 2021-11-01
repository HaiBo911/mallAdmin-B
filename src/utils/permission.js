/* 角色对应的权限名称 */
const roleToRouter = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'List',
  }, {
    name: 'Add',
  }, {
    name: 'Edit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'List',
  }, {
    name: 'Add',
  }, {
    name: 'Category',
  }, {
    name: 'Edit',
  }],
};

/* 过滤掉没有权限的路由 */
export default function getMenuRouter(role, routes) {
  const allowRotesName = roleToRouter[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRotesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRotesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
