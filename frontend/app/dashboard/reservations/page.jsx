"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

import { apiFetch } from "../../../lib/api";

export default function ReservationsPage() {
  const [catways, setCatways] = useState([]);
  const [selectedCatway, setSelectedCatway] = useState("");

  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCatways = async () => {
      try {
        const data = await apiFetch("/catways");
        setCatways(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCatways();
  }, []);

  const loadReservations = async (catwayId) => {
    if (!catwayId) return;

    setLoading(true);
    setError("");

    try {
      const data = await apiFetch(`/catways/${catwayId}/reservations`);
      setReservations(data);
    } catch (err) {
      setError(err.message || "Erreur chargement réservations");
    } finally {
      setLoading(false);
    }
  };

  const handleCatwayChange = (e) => {
    const value = e.target.value;
    setSelectedCatway(value);
    loadReservations(value);
  };

  const onDelete = async (reservationId) => {
    const ok = window.confirm("Supprimer cette réservation ?");
    if (!ok) return;

    try {
      await apiFetch(
        `/catways/${selectedCatway}/reservations/${reservationId}`,
        { method: "DELETE" }
      );

      await loadReservations(selectedCatway);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <h1 className="h3 mb-3">Réservations</h1>

      <Card className="mb-3">
        <Card.Body>
          <Form.Group>
            <Form.Label>Sélectionner un catway</Form.Label>
            <Form.Select
              value={selectedCatway}
              onChange={handleCatwayChange}
            >
              <option value="">-- Choisir --</option>
              {catways.map((c) => (
                <option key={c.catwayNumber} value={c.catwayNumber}>
                  Catway {c.catwayNumber}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {selectedCatway && (
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">
                Réservations du catway {selectedCatway}
              </h5>

              <Button
                as={Link}
                href={`/dashboard/reservations/new?catway=${selectedCatway}`}
              >
                + Nouvelle réservation
              </Button>
            </div>

            {loading && (
              <div className="d-flex align-items-center gap-2 text-muted">
                <Spinner size="sm" />
                Chargement...
              </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && reservations.length === 0 && (
              <div className="text-muted">
                Aucune réservation pour ce catway.
              </div>
            )}

            {!loading && reservations.length > 0 && (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Bateau</th>
                    <th>Début</th>
                    <th>Fin</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r._id}>
                      <td>{r.clientName}</td>
                      <td>{r.boatName}</td>
                      <td>
                        {new Date(r.startDate).toLocaleDateString("fr-FR")}
                      </td>
                      <td>
                        {new Date(r.endDate).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="d-flex gap-2">
                        <Button
                          as={Link}
                          href={`/dashboard/reservations/${r._id}/edit?catway=${selectedCatway}`}
                          variant="outline-primary"
                          size="sm"
                        >
                          Modifier
                        </Button>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onDelete(r._id)}
                        >
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}
