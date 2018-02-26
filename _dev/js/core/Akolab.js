export default class Akolab {
  constructor(option = {}) {
    this.option = Object.assign({}, {
      breakPoint: {
        sp: 767,
        tablet: 920
      }
    }, option);
    this.observerList = {};
    this.observerList.resize = [];
    this.observerList.viewType = [];

    this._winSize = this.getWinSize();
    this._viewType = this.getViewType();
    this._resize;

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * ウィンドウサイズのセット
   * @param {object} value
   */
  set winSize(value) {
    this._winSize = value;

    // オブザーバーのメソッドを順次実行する
    for (let i = 0, len = this.observerList.resize.length; i < len; i++) {
      this.observerList.resize[i]();
    }
  }

  /**
   * ウィンドウサイズを返す
   * @return {object}
   */
  get winSize() {
    return this._winSize;
  }

  /**
   * ビュータイプのセット
   * @param {string} value
   */
  set viewType(value) {
    if (this._viewType === value) {
      return;
    }

    this._viewType = value; // 値を設定する

    // オブザーバーのメソッドを順次実行する
    for (let i = 0, len = this.observerList.viewType.length; i < len; i++) {
      this.observerList.viewType[i]();
    }
  }

  /**
   * ビュータイプを返す
   * @return {string}
   */
  get viewType() {
    return this._viewType;
  }

  /**
   * ウィンドウサイズの取得
   * @return {object}
   */
  getWinSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  /**
   * ビュータイプの取得
   * @return {string}
   */
  getViewType() {
    for (let type in this.option.breakPoint) {
      if (this.winSize.width > this.option.breakPoint[type]) {
        continue;
      }
      return type;
    }
    return 'pc';
  }

  /**
   * オブザーバーの追加
   * @param {string} type
   * @param {function} fn
   */
  addObserverList(type, fn) {
    this.observerList[type].push(fn);
  }

  /**
   * リサイズイベント
   */
  handleResize() {
    clearTimeout(this._resize);
    this._resize = setTimeout(() => {
      this.winSize = this.getWinSize();
      this.viewType = this.getViewType();
    }, 80);
  }
}
