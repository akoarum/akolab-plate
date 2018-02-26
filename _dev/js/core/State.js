/* @flow */
export default class State {
  observerList: { [index: string]: Array<void> };

  constructor() {
    this.observerList = {};
  }


  /**
   * ステートのセット
   * @param {String} name セットするステートの名前
   * @param {Any} defaultState ステートにセットする初期値
   * @param {Array<Void>} observer 初期でセットするオブザーバーメソッド
   */
  setState(name: string, defaultState: any = null, observer: Array<void> = []) {
    (this: {})[`_${ name }`] = defaultState;

    Object.defineProperty(this, name, {
      get() {
        return this[`_${ name }`];
      },
      set(value) {
        if (value === this[`_${ name }`]) {
          return;
        }
        (this: {})[`_${ name }`] = value;

        // オブザーバーの呼び出し
        if (this.observerList[name] && this.observerList[name].length) {
          for (let i = 0, len = this.observerList[name].length; i < len; i++) {
            this.observerList[name][i]();
          }
        }
      }
    });

    // オブザーバーリストにオブザーバーを追加
    this.observerList[name] = observer;
  }


  /**
   * ステートの値取得
   * @param {String} name 取得するステートの名前
   * @return {Any}
   */
  getState(name: string): any {
    if (!(name in this)) {
      return undefined;
    }
    return (this: {})[name];
  }


  /**
   * ステートのアップデート
   * @param {String} name アップデートするステートの名前
   * @param {Any} value ステートにセットする値
   */
  updateState(name: string, value: any) {
    if (!(name in this)) {
      throw new Error('存在しないステートです。');
    }
    (this: {})[name] = value;
  }

  /**
   * ステート名一覧の取得
   * @return {Array}
   */
  getStateName(): Array<string> {
    const names = Object.keys(this);
    names.splice(names.indexOf('observerList'), 1);
    return names;
  }


  /**
   * オブザーバーメソッドの追加
   * @param {String} name セット対象のステートの名前
   * @param {Void} observer セットするオブザーバーメソッド
   */
  addObserverList(name: string, observer: any) {
    // オブザーバーリストに名前が存在しなければエラーをスローする
    if (!(name in this.observerList)) {
      throw new Error('存在しないオブザーバーリストです。');
    }
    this.observerList[name].push(observer);
  }
}
