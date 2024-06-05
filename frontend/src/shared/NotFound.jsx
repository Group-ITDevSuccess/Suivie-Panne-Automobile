import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: '#343a40',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: '1.5rem',
            color: '#6c757d',
            marginBottom: '2rem',
          }}
        >
          Page Not Found
        </h2>
        <p>
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button
          variant="primary"
          as={Link}
          to="/"
          style={{
            padding: '0.75rem 1.25rem',
            fontSize: '1rem',
          }}
        >
          Go to Home
        </Button>
      </div>
    </Container>
  );
}
