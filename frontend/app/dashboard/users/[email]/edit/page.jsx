"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { apiFetch } from "../../../../../lib/api";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();

  // Next peut fournir email déjà décodé, mais on sécurise
  const emailParam = Array.isArray(params.email) ? params.email[0] : params.email;
  const email = decodeURIComponent(emailParam || "");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await apiFetch(`/users/${encodeURIComponent(email)}`);
        setUsername(data.username || "");
      } catch (err) {
        setError(err.message || "Impossible de charger l'utilisateur");
      } finally {
        setLoading(false);
      }
    };

    if (email) load();
  }, [email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body = { username };
      // password optionnel
      if (password.trim().length > 0) body.password = password;

      await apiFetch(`/users/${encodeURIComponent(email)}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      router.push("/dashboard/users");
    } catch (err) {
      setError(err.message || "Modification impossible");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Modifier utilisateur</h1>
        <Button as={Link} href="/dashboard/users" variant="outline-secondary">
          Retour
        </Button>
      </div>

      <Card>
        <Card.Body>
          {loading && (
            <div className="d-flex align-items-center gap-2 text-muted">
              <Spinner size="sm" />
              Chargement...
            </div>
          )}

          {error && !loading && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && (
            <Form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
              <Form.Group className="mb-3">
                <Form.Label>Email (identifiant)</Form.Label>
                <Form.Control value={email} disabled />
              </Form.Group>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={2}
                  maxLength={50}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Nouveau mot de passe (optionnel)</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  placeholder="Laisse vide pour ne pas changer"
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => router.push("/dashboard/users")}
                  disabled={saving}
                >
                  Annuler
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
