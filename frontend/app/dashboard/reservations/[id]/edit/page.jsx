"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { apiFetch } from "../../../../../lib/api";

export default function EditReservationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const reservationId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const catwayNumber = searchParams.get("catway");

  const [clientName, setClientName] = useState("");
  const [boatName, setBoatName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!catwayNumber) {
        setError("Catway non fourni");
        setLoading(false);
        return;
      }

      try {
        const data = await apiFetch(
          `/catways/${catwayNumber}/reservations/${reservationId}`
        );

        setClientName(data.clientName);
        setBoatName(data.boatName);
        setStartDate(data.startDate.slice(0, 10));
        setEndDate(data.endDate.slice(0, 10));
      } catch (err) {
        setError(err.message || "Chargement impossible");
      } finally {
        setLoading(false);
      }
    };

    if (reservationId) load();
  }, [reservationId, catwayNumber]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (new Date(endDate) <= new Date(startDate)) {
      setError("La date de fin doit être après la date de début.");
      return;
    }

    setSaving(true);

    try {
      await apiFetch(
        `/catways/${catwayNumber}/reservations/${reservationId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            clientName,
            boatName,
            startDate,
            endDate,
          }),
        }
      );

      router.push("/dashboard/reservations");
    } catch (err) {
      setError(err.message || "Modification impossible");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Modifier réservation</h1>
        <Button as={Link} href="/dashboard/reservations" variant="outline-secondary">
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
                <Button type="submit" disabled={saving}>
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => router.push("/dashboard/reservations")}
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
