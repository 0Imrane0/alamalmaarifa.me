import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { db, collection, addDoc } from "../lib/firebase";

export default function LeadFormModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    cycle: "Maternelle",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        status: "Nouveau",
        createdAt: new Date().toISOString(),
      });
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({ parentName: "", phone: "", cycle: "Maternelle" });
      }, 2500);
    } catch (error) {
      console.error("Lead submission error:", error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* Wrapper animates opacity — one AnimatePresence child for clean exit */
        <motion.div
          key="modal"
          className="lead-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Blurred backdrop — click to close */}
          <div className="lead-modal-backdrop" onClick={onClose} />

          {/* Glassmorphic card — slides up from below */}
          <motion.div
            className="lead-modal-content"
            initial={{ y: 32, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
          >
            <button
              onClick={onClose}
              className="lead-modal-close"
              aria-label="Fermer"
            >
              ✕
            </button>

            {status === "success" ? (
              /* ── Success state ── */
              <div className="lead-modal-success">
                <span className="lead-modal-success__icon">✨</span>
                <h3 className="lead-modal-success__title">Demande Envoyée</h3>
                <p className="lead-modal-success__text">
                  Nous vous contacterons très prochainement.
                </p>
              </div>
            ) : (
              /* ── Form state ── */
              <>
                <h3 className="lead-modal-title">Pré-inscription</h3>
                <p className="lead-modal-subtitle">
                  Laissez-nous vos coordonnées pour être prioritaire lors des
                  inscriptions 2026/2027.
                </p>

                <form className="lead-form" onSubmit={handleSubmit} noValidate>
                  <div className="lead-form-group">
                    <label className="lead-form-label" htmlFor="lf-name">
                      Nom du Parent / Tuteur
                    </label>
                    <input
                      id="lf-name"
                      required
                      type="text"
                      className="lead-form-input"
                      value={formData.parentName}
                      onChange={(e) =>
                        setFormData({ ...formData, parentName: e.target.value })
                      }
                      autoComplete="name"
                    />
                  </div>

                  <div className="lead-form-group">
                    <label className="lead-form-label" htmlFor="lf-phone">
                      Téléphone (WhatsApp)
                    </label>
                    <input
                      id="lf-phone"
                      required
                      type="tel"
                      className="lead-form-input"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      autoComplete="tel"
                    />
                  </div>

                  <div className="lead-form-group">
                    <label className="lead-form-label" htmlFor="lf-cycle">
                      Cycle Visé
                    </label>
                    <select
                      id="lf-cycle"
                      className="lead-form-select"
                      value={formData.cycle}
                      onChange={(e) =>
                        setFormData({ ...formData, cycle: e.target.value })
                      }
                    >
                      <option value="Maternelle">Maternelle</option>
                      <option value="Primaire">Primaire</option>
                    </select>
                  </div>

                  {status === "error" && (
                    <p className="lead-form-error" role="alert">
                      Une erreur est survenue. Veuillez réessayer.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="lead-form-submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading"
                      ? "Envoi en cours…"
                      : "Confirmer la Pré-inscription"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
