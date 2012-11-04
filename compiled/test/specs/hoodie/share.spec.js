// Generated by CoffeeScript 1.3.3

describe("Hoodie.Share", function() {
  beforeEach(function() {
    this.hoodie = new Mocks.Hoodie;
    this.share = new Hoodie.Share(this.hoodie);
    return spyOn(this.share, "instance");
  });
  describe("constructor", function() {
    return it("should extend hoodie.store API with shareAt / unshareAt methods", function() {
      var shareAt, unshare, unshareAt, _ref;
      spyOn(this.hoodie.store, "decoratePromises");
      new Hoodie.Share(this.hoodie);
      expect(this.hoodie.store.decoratePromises).wasCalled();
      _ref = this.hoodie.store.decoratePromises.mostRecentCall.args[0], shareAt = _ref.shareAt, unshareAt = _ref.unshareAt, unshare = _ref.unshare;
      expect(typeof shareAt).toBe('function');
      expect(typeof unshareAt).toBe('function');
      return expect(typeof unshare).toBe('function');
    });
  });
  describe("direct call", function() {
    beforeEach(function() {
      return spyOn(this.hoodie, "open");
    });
    return it("should init a new share instance", function() {
      var instance, share;
      spyOn(Hoodie, "ShareInstance");
      share = new Hoodie.Share(this.hoodie);
      instance = share('funk123', {
        option: 'value'
      });
      return expect(share.instance).wasCalled();
    });
  });
  describe("#instance", function() {
    return it("should point to Hoodie.ShareInstance", function() {
      var share;
      share = new Hoodie.Share(this.hoodie);
      return expect(share.instance).toBe(Hoodie.ShareInstance);
    });
  });
  describe("#add(attributes)", function() {
    beforeEach(function() {
      this.instance = jasmine.createSpy("instance");
      this.share.instance.andReturn(this.instance);
      this.addDefer = this.hoodie.defer();
      return spyOn(this.hoodie.store, "add").andReturn(this.addDefer.promise());
    });
    it("should add new object in hoodie.store", function() {
      this.share.add({
        id: '123'
      });
      return expect(this.hoodie.store.add).wasCalledWith('$share', {
        id: '123'
      });
    });
    return _when("store.add successful", function() {
      beforeEach(function() {
        return this.addDefer.resolve({
          hell: 'yeah'
        });
      });
      return it("should resolve with a share instance", function() {
        return expect(this.share.add({
          funky: 'fresh'
        })).toBeResolvedWith(this.instance);
      });
    });
  });
  describe("#find(share_id)", function() {
    beforeEach(function() {
      var promise;
      promise = this.hoodie.defer().resolve({
        funky: 'fresh'
      }).promise();
      spyOn(this.hoodie.store, "find").andReturn(promise);
      return this.share.instance.andCallFake(function() {
        return this.foo = 'bar';
      });
    });
    it("should proxy to store.find('$share', share_id)", function() {
      var promise;
      promise = this.share.find('123');
      return expect(this.hoodie.store.find).wasCalledWith('$share', '123');
    });
    return it("should resolve with a Share Instance", function() {
      var promise;
      this.hoodie.store.find.andReturn(this.hoodie.defer().resolve({}).promise());
      this.share.instance.andCallFake(function() {
        return this.foo = 'bar';
      });
      promise = this.share.find('123');
      return expect(promise).toBeResolvedWith({
        foo: 'bar'
      });
    });
  });
  describe("#findOrAdd(id, share_attributes)", function() {
    beforeEach(function() {
      return spyOn(this.hoodie.store, "findOrAdd").andCallThrough();
    });
    it("should proxy to hoodie.store.findOrAdd with type set to '$share'", function() {
      this.share.findOrAdd('id123', {});
      return expect(this.hoodie.store.findOrAdd).wasCalledWith('$share', 'id123', {});
    });
    return it("should resolve with a Share Instance", function() {
      var promise;
      this.hoodie.store.findOrAdd.andReturn(this.hoodie.defer().resolve({}).promise());
      this.share.instance.andCallFake(function() {
        return this.foo = 'bar';
      });
      promise = this.share.findOrAdd('id123', {});
      return expect(promise).toBeResolvedWith({
        foo: 'bar'
      });
    });
  });
  describe("#findAll()", function() {
    beforeEach(function() {
      return spyOn(this.hoodie.store, "findAll").andCallThrough();
    });
    it("should proxy to hoodie.store.findAll('$share')", function() {
      this.hoodie.store.findAll.andCallThrough();
      this.share.findAll();
      return expect(this.hoodie.store.findAll).wasCalledWith('$share');
    });
    return it("should resolve with an array of Share instances", function() {
      var promise;
      this.hoodie.store.findAll.andReturn(this.hoodie.defer().resolve([{}, {}]).promise());
      this.share.instance.andCallFake(function() {
        return this.foo = 'bar';
      });
      promise = this.share.findAll();
      return expect(promise).toBeResolvedWith([
        {
          foo: 'bar'
        }, {
          foo: 'bar'
        }
      ]);
    });
  });
  describe("#save('share_id', attributes)", function() {
    beforeEach(function() {
      return spyOn(this.hoodie.store, "save").andCallThrough();
    });
    it("should proxy to hoodie.store.save('$share', 'share_id', attributes)", function() {
      this.share.save('abc4567', {
        password: 'fresh'
      });
      return expect(this.hoodie.store.save).wasCalledWith('$share', 'abc4567', {
        password: 'fresh'
      });
    });
    return it("should resolve with a Share Instance", function() {
      var promise;
      this.hoodie.store.save.andReturn(this.hoodie.defer().resolve({}).promise());
      this.share.instance.andCallFake(function() {
        return this.foo = 'bar';
      });
      promise = this.share.save({});
      return expect(promise).toBeResolvedWith({
        foo: 'bar'
      });
    });
  });
  describe("#update('share_id', changed_attributes)", function() {
    beforeEach(function() {
      return spyOn(this.hoodie.store, "update").andCallThrough();
    });
    it("should proxy to hoodie.store.update('$share', 'share_id', attributes)", function() {
      this.share.update('abc4567', {
        password: 'fresh'
      });
      return expect(this.hoodie.store.update).wasCalledWith('$share', 'abc4567', {
        password: 'fresh'
      });
    });
    return it("should resolve with a Share Instance", function() {
      var promise;
      this.hoodie.store.update.andReturn(this.hoodie.defer().resolve({}).promise());
      this.share.instance.andCallFake(function() {
        return this.foo = 'bar';
      });
      promise = this.share.update({});
      return expect(promise).toBeResolvedWith({
        foo: 'bar'
      });
    });
  });
  describe("#updateAll(changed_attributes)", function() {
    beforeEach(function() {
      return spyOn(this.hoodie.store, "updateAll").andCallThrough();
    });
    it("should proxy to hoodie.store.updateAll('$share', changed_attributes)", function() {
      this.hoodie.store.updateAll.andCallThrough();
      this.share.updateAll({
        password: 'fresh'
      });
      return expect(this.hoodie.store.updateAll).wasCalledWith('$share', {
        password: 'fresh'
      });
    });
    return it("should resolve with an array of Share instances", function() {
      var promise;
      this.hoodie.store.updateAll.andReturn(this.hoodie.defer().resolve([{}, {}]).promise());
      this.share.instance.andCallFake(function() {
        return this.foo = 'bar';
      });
      promise = this.share.updateAll({
        password: 'fresh'
      });
      return expect(promise).toBeResolvedWith([
        {
          foo: 'bar'
        }, {
          foo: 'bar'
        }
      ]);
    });
  });
  describe("#remove(share_id)", function() {
    beforeEach(function() {
      spyOn(this.hoodie.store, "findAll").andReturn({
        unshareAt: function() {}
      });
      return spyOn(this.hoodie.store, "remove").andReturn('remove_promise');
    });
    return it("should init the share instance and remove it", function() {
      var promise;
      promise = this.share.remove('123');
      return expect(promise).toBe('remove_promise');
    });
  });
  describe("#removeAll()", function() {
    beforeEach(function() {
      spyOn(this.hoodie.store, "findAll").andReturn({
        unshare: function() {}
      });
      return spyOn(this.hoodie.store, "removeAll").andReturn('remove_promise');
    });
    return it("should init the share instance and remove it", function() {
      var promise;
      promise = this.share.removeAll();
      return expect(promise).toBe('remove_promise');
    });
  });
  return describe("hoodie.store promise decorations", function() {
    beforeEach(function() {
      this.storeDefer = this.hoodie.defer();
      return spyOn(this.hoodie.store, "update");
    });
    describe("#shareAt(shareId, properties)", function() {
      _when("promise returns one object", function() {
        beforeEach(function() {
          this.promise = this.storeDefer.resolve({
            $type: 'task',
            id: '123',
            title: 'milk'
          });
          return this.promise.hoodie = this.hoodie;
        });
        _and("no properties passed", function() {
          return it("should save object returned by promise with {$shares: {shareId: true}}", function() {
            Hoodie.Share.prototype._storeShareAt.apply(this.promise, ['shareId']);
            return expect(this.hoodie.store.update).wasCalledWith('task', '123', {
              $shares: {
                shareId: true
              }
            });
          });
        });
        return _and("properties passed as array", function() {
          return it("should save object returned by promise with {$shares: {shareId: ['title', 'owner']}}", function() {
            var properties;
            this.storeDefer.resolve({
              $type: 'task',
              id: '123',
              title: 'milk'
            });
            properties = ['title', 'owner'];
            Hoodie.Share.prototype._storeShareAt.apply(this.promise, ['shareId', properties]);
            return expect(this.hoodie.store.update).wasCalledWith('task', '123', {
              $shares: {
                shareId: ['title', 'owner']
              }
            });
          });
        });
      });
      return _when("promise returns multiple objects", function() {
        beforeEach(function() {
          this.promise = this.storeDefer.resolve([
            {
              $type: 'task',
              id: '123',
              title: 'milk'
            }, {
              $type: 'task',
              id: '456',
              title: 'milk'
            }
          ]);
          return this.promise.hoodie = this.hoodie;
        });
        _and("no properties passed", function() {
          return it("should update object returned by promise with $public: true", function() {
            Hoodie.Share.prototype._storeShareAt.apply(this.promise, ['shareId']);
            expect(this.hoodie.store.update).wasCalledWith('task', '123', {
              $shares: {
                shareId: true
              }
            });
            return expect(this.hoodie.store.update).wasCalledWith('task', '456', {
              $shares: {
                shareId: true
              }
            });
          });
        });
        return _and("properties passed as array", function() {
          return it("should update object returned by promise with $public: ['title', 'owner']", function() {
            var properties;
            properties = ['title', 'owner'];
            Hoodie.Share.prototype._storeShareAt.apply(this.promise, ['shareId', properties]);
            expect(this.hoodie.store.update).wasCalledWith('task', '123', {
              $shares: {
                shareId: ['title', 'owner']
              }
            });
            return expect(this.hoodie.store.update).wasCalledWith('task', '456', {
              $shares: {
                shareId: ['title', 'owner']
              }
            });
          });
        });
      });
    });
    describe("#unshareAt(shareId)", function() {
      _when("object is currently shared at 'shareId'", function() {
        beforeEach(function() {
          this.promise = this.storeDefer.resolve({
            $type: 'task',
            id: '123',
            title: 'milk',
            $shares: {
              shareId: true
            }
          });
          return this.promise.hoodie = this.hoodie;
        });
        return it("should save object returned by promise with {$shares: {shareId: false}}", function() {
          Hoodie.Share.prototype._storeUnshareAt.apply(this.promise, ['shareId']);
          return expect(this.hoodie.store.update).wasCalledWith('task', '123', {
            $shares: {
              shareId: false
            }
          });
        });
      });
      return _when("promise returns multiple objects, of which some are shared at 'shareId'", function() {
        beforeEach(function() {
          this.promise = this.storeDefer.resolve([
            {
              $type: 'task',
              id: '123',
              title: 'milk'
            }, {
              $type: 'task',
              id: '456',
              title: 'milk',
              $shares: {
                shareId: true
              }
            }, {
              $type: 'task',
              id: '789',
              title: 'milk',
              $shares: {
                shareId: ['title', 'owner']
              }
            }
          ]);
          return this.promise.hoodie = this.hoodie;
        });
        return it("should update objects returned by promise with {$shares: {shareId: false}}", function() {
          Hoodie.Share.prototype._storeUnshareAt.apply(this.promise, ['shareId']);
          expect(this.hoodie.store.update).wasNotCalledWith('task', '123', {
            $shares: {
              shareId: false
            }
          });
          expect(this.hoodie.store.update).wasCalledWith('task', '456', {
            $shares: {
              shareId: false
            }
          });
          return expect(this.hoodie.store.update).wasCalledWith('task', '789', {
            $shares: {
              shareId: false
            }
          });
        });
      });
    });
    return describe("#unshare()", function() {
      _when("promise returns one object", function() {
        beforeEach(function() {
          this.promise = this.storeDefer.resolve({
            $type: 'task',
            id: '123',
            title: 'milk',
            $shares: {
              shareId: true
            }
          });
          return this.promise.hoodie = this.hoodie;
        });
        return it("should save object returned by promise with {$shares: {shareId: false}}", function() {
          Hoodie.Share.prototype._storeUnshare.apply(this.promise, []);
          return expect(this.hoodie.store.update).wasCalledWith('task', '123', {
            $shares: {
              shareId: false
            }
          });
        });
      });
      return _when("promise returns multiple objects, of which some are shared at 'shareId'", function() {
        beforeEach(function() {
          this.promise = this.storeDefer.resolve([
            {
              $type: 'task',
              id: '123',
              title: 'milk'
            }, {
              $type: 'task',
              id: '456',
              title: 'milk',
              $shares: {
                shareId: true
              }
            }, {
              $type: 'task',
              id: '789',
              title: 'milk',
              $shares: {
                shareId: ['title', 'owner']
              }
            }
          ]);
          return this.promise.hoodie = this.hoodie;
        });
        return it("should update objects returned by promise with {$shares: {shareId: false}}", function() {
          Hoodie.Share.prototype._storeUnshare.apply(this.promise, []);
          expect(this.hoodie.store.update).wasNotCalledWith('task', '123', {
            $shares: {
              shareId: false
            }
          });
          expect(this.hoodie.store.update).wasCalledWith('task', '456', {
            $shares: {
              shareId: false
            }
          });
          return expect(this.hoodie.store.update).wasCalledWith('task', '789', {
            $shares: {
              shareId: false
            }
          });
        });
      });
    });
  });
});
