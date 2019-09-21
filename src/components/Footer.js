import React from 'react'
import * as URL from 'constants/url'
import './Footer.scss'

const footerLinks = [
  { title: '명지대학교', link: URL.MJU_UNIV },
  { title: 'E-Class', link: URL.E_CLASS },
  { title: 'Myiweb', link: URL.MYIWEB },
]

const Footer = () => (
  <footer className="Footer">
    <div className="Footer__inner">
      <ul className="Footer__linkBox">
        {
          footerLinks.map(({ title, link }) => (
            <li className="Footer__link" key={title}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
              >
                {title}
              </a>
            </li>
          ))
        }
      </ul>
      <div className="Footer__copyright">&copy; 2019 강평강평</div>
    </div>
  </footer>
)

export default Footer
