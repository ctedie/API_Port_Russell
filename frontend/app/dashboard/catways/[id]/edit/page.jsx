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

export default function EditCatwayPage() {
  const router = useRouter();
  const params = useParams();

  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = idParam;

  const [catwayNumber, setCatwayNumber] = useState("");
  const [catwayType, setCatwayType] = useState("");
  const [catwayState, setCatwayState] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await apiFetch(`/catways/${id}`);
        setCatwayNumber(data.catwayNumber);
        setCatwayType(data.catwayType);
        setCatwayState(data.catwayState);
      } catch (err) {
        setError(err.message || "Impossible de charger le catway");
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await apiFetch(`/catways/${id}`, {
        method: "PUT",
        body: JSON.stringify({ catwayState }),
      });

      router.push("/dashboard/catways");
    } catch (err) {
      setError(err.message || "Modification impossible");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Modifier catway</h1>
        <Button as={Link} href="/dashboard/catways" variant="outline-secondary">
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
                <Form.Label>Numéro</Form.Label>
                <Form.Control value={catwayNumber} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control value={catwayType} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>État</Form.Label>
                <Form.Control
                  value={catwayState}
                  onChange={(e) => setCatwayState(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => router.push("/dashboard/catways")}
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
