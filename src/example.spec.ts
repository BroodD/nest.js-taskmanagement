// describe('my test', () => {
//   it('returns true', () => {
//     expect(true).toEqual(true);
//   });
// });

class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    console.log('--- my new friend', name);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }
}

describe('FreiendList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('add a friend to the list', () => {
    friendsList.addFriend('Ariel');

    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Ariel');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Ariel');
  });

  describe('removeFriend', () => {
    it('remove friend from list', () => {
      friendsList.addFriend('Ariel');
      expect(friendsList.friends[0]).toEqual('Ariel');
      friendsList.removeFriend('Ariel');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('get error of friend not found', () => {
      expect(() => friendsList.removeFriend('Ariel')).toThrow(
        new Error('Friend not found!'),
      );
    });
  });
});
