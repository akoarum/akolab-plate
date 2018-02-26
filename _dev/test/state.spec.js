import State from '../js/core/State';
import chai from 'chai';
import sinon from 'sinon';

describe('Global State:', () => {
  let state;

  beforeEach(() => {
    state = new State();
  });

  afterEach(() => {
    state = {};
  });


  it('name: test、state: test、observer: function() { return 1 + 1 }をセットする', () => {
    state.setState('test', 'test', [() => 1 + 1]);
    chai.expect(state.test).to.equal('test');
    chai.expect(state.observerList.test[0]()).to.equal(2);
  });


  it('setStateで追加したオブザーバーは、値を変更するたびに呼ばれる', () => {
    const observerList = {
      defaultObserver: () => 1 + 1
    };
    const spy = sinon.spy(observerList, 'defaultObserver');
    state.setState('test', 'test', [observerList.defaultObserver]);
    state.test = 'test2';
    chai.expect(spy.callCount).to.equal(1);
  });


  describe('getState', () => {
    beforeEach(() => {
      state.test = 'test1';
    });

    it('存在する名前のステートを取得した時は、正しい値が返ってくる', () => {
      chai.expect(state.getState('test')).to.equal('test1');
    });

    it('存在しない名前のステートを取得した時は、undefinedが返ってくる', () => {
      chai.expect(state.getState('test2')).to.be.undefined;
    });
  });


  describe('updateState', () => {
    beforeEach(() => {
      state.test = 'test1';
    });

    it('存在する名前のステートにセットする', () => {
      state.updateState('test', 'value');
      chai.expect(state.test).to.equal('value');
    });

    it('存在する名前のステートにセットしようとすると、Errorがスローされる', () => {
      chai.expect(() => state.updateState('test2')).to.throw();
    });
  });


  it('ステートに登録された名前を全て取得する', () => {
    state.test = '';
    state.test2 = '';
    chai.expect(state.getStateName()).to.deep.equal(['test', 'test2']);
  });


  describe('オブザーバーに追加する', () => {
    afterEach(() => {
      state.observerList = {};
    });

    it('存在するリストにオブザーバーに追加すると、問題なく実行までできる', () => {
      state.observerList.addObserver = [];
      state.addObserverList('addObserver', () => 1 + 1);
      chai.expect(state.observerList.addObserver[0]()).to.equal(2);
    });

    it('存在しないリストに追加しようとすると、Errorがスローされる', () => {
      chai.expect(() => state.addObserverList('addObserver', () => 1 + 1)).to.throw();
    });
  });
});
