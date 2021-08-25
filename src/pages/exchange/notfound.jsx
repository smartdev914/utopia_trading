import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function notfound() {
  return (
    <Layout>
      <div className="error-page vh-100 d-flex justify-content-center text-center">
        <div className="my-auto">
          <h2>404</h2>
          <p>Oops something went wrong</p>
          <Link href="/">
            <a href="/" className="btn">
              Back to Home <i className="icon ion-md-home" />
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
