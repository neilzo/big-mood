import Realm from 'realm';

class User extends Realm.Object {}
User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    userName: 'string',
    location: 'string?',
    createdAt: 'date',
    modifiedAt: 'date',
  },
};

export default User;
