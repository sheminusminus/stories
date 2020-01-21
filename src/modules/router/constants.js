export const Paths = {
  CREATE: 'create',
  EDIT: 'edit',
  EDITOR: 'editor',
  JOIN: 'join',
  VIEW: 'view',
};

export const Routes = {
  create: () => `/${Paths.CREATE}`,
  edit: (roomId = ':roomId') => `/${Paths.EDITOR}/${roomId}/${Paths.EDIT}`,
  join: (roomId = ':roomId') => `/${Paths.EDITOR}/${roomId}/${Paths.JOIN}`,
  view: (readOnlyId = ':readOnlyId') => `/${Paths.VIEW}/${readOnlyId}`,
};

