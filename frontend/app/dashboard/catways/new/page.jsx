"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { apiFetch } from "../../../../lib/api";

export default function NewCatwayPage() {
  const router = useRouter();

  const [catwayNumber, setCatwayNumber] = useState("");
  const [catwayType, setCatwayType] = useState("long");
  const [catwayState, setCatwayState] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch("/catways", {
        method: "POST",
        body: JSON.stringify({
          catwayNumber: Number(catwayNumber),
          catwayType,
          catwayState,
        }),
      });

      router.push("/dashboard/catways");
    } catch (err) {
      setError(err.message || "Création impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Nouveau catway</h1>
        <Button as={Link} href="/dashboard/catways" variant="outline-secondary">
          Retour
        </Button>
      </div>

      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
            <Form.Group className="mb-3">
              <Form.Label>Numéro</Form.Label>
              <Form.Control
                type="number"
                value={catwayNumber}
                onChange={(e) => setCatwayNumber(e.target.value)}
                required
                min={1}
                placeholder="ex: 1"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={catwayType}
                onChange={(e) => setCatwayType(e.target.value)}
              >
                <option value="long">Long</option>
                <option value="short">Short</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>État</Form.Label>
              <Form.Control
                value={catwayState}
                onChange={(e) => setCatwayState(e.target.value)}
                required
                placeholder="ex: Bon état"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer"}
              </Button>

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => router.push("/dashboard/catways")}
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
