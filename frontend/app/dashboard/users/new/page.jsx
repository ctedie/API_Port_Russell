"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { apiFetch } from "../../../../lib/api";

export default function NewUserPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });

      router.push("/dashboard/users");
    } catch (err) {
      setError(err.message || "Création impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Nouvel utilisateur</h1>
        <Button as={Link} href="/dashboard/users" variant="outline-secondary">
          Retour
        </Button>
      </div>

      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={2}
                maxLength={50}
                placeholder="ex: Admin"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ex: admin@port.local"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Minimum 8 caractères"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer"}
              </Button>

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => router.push("/dashboard/users")}
                disabled={loading}
              >
                Annuler
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
