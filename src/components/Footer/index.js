import React from 'react';
import { Layout, Image, Button } from 'antd';
import cx from 'classname';

import LogoImage from './images/logo.svg';
import FooterImage from './images/footer.svg';

import { ICON_LINK_LIST } from './constant';

import styles from './footer.module.less';

const { Footer } = Layout;

export default () => {
  function renderIconLink() {
    return (
      <div className={styles.iconLinkList}>
        {ICON_LINK_LIST.map((item) => (
          <a className={cx('iconfont', styles.iconLink, item.icon)} href={item.href} />
        ))}
      </div>
    );
  }

  return (
    <Footer className={styles.footer}>
      <Image src={FooterImage} preview={false} width="100%" />
      <div className={styles.ending}>
        <Image className={styles.footLogo} src={LogoImage} preview={false} />
        <div className={styles.links}>
          <div>
            <a className={styles.link} href="#">
              Project
            </a>
            <a className={styles.link} href="#">
              Terms
            </a>
            <a className={styles.link} href="#">
              Privacy
            </a>
          </div>
          {renderIconLink()}
        </div>
        <p className={styles.copyright}>Project By Dream</p>
      </div>
    </Footer>
  );
};
