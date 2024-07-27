import React from 'react';

export default function Footer() {
  return (
    <div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              {/* Add logo or branding image here if needed */}
            </a>
            <span className="text-muted">© 2022 <i>GoFood</i>, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="/" aria-label="Facebook">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#facebook-icon"></use>
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/" aria-label="Twitter">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#twitter-icon"></use>
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/" aria-label="Instagram">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#instagram-icon"></use>
                </svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
