"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { apiFetch } from "../../../../lib/api";

export default function NewReservationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const catwayNumber = searchParams.get("catway");

  const [clientName, setClientName] = useState("");
  const [boatName, setBoatName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!catwayNumber) {
      setError("Catway non sélectionné");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setError("La date de fin doit être après la date de début.");
      return;
    }

    setLoading(true);

    try {
      await apiFetch(`/catways/${catwayNumber}/reservations`, {
        method: "POST",
        body: JSON.stringify({
          clientName,
          boatName,
          startDate,
          endDate,
        }),
      });

      router.push("/dashboard/reservations");
    } catch (err) {
      setError(err.message || "Création impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Nouvelle réservation</h1>
        <Button as={Link} href="/dashboard/reservations" variant="outline-secondary">
          Retour
        </Button>
      </div>

      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
            <Form.Group className="mb-3">
              <Form.Label>Catway</Form.Label>
              <Form.Control value={catwayNumber || ""} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nom du client</Form.Label>
              <Form.Control
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nom du bateau</Form.Label>
              <Form.Control
                value={boatName}
                onChange={(e) => setBoatName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de début</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer"}
              </Button>

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => router.push("/dashboard/reservations")}
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
