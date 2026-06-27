import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSy_YOUR_API_KEY",
  authDomain: "alam-al-maarifa.firebaseapp.com",
  projectId: "alam-al-maarifa",
  storageBucket: "alam-al-maarifa.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simple password protection (Client-side for simplicity as requested, but can be moved to Firebase Auth)
const authModal = document.createElement("div");
authModal.innerHTML = `
    <div style="position:fixed;inset:0;background:#081226;z-index:999999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;">
        <h2 style="font-family:'Playfair Display', serif;color:#C5A028;">Accès Restreint</h2>
        <input type="password" id="secret-pass" placeholder="Mot de passe" style="padding:0.8rem;background:rgba(255,255,255,0.05);border:1px solid rgba(197,160,40,0.3);color:white;border-radius:4px;" />
        <button id="secret-btn" style="padding:0.8rem 2rem;background:#C5A028;border:none;border-radius:4px;cursor:pointer;font-weight:bold;">Entrer</button>
    </div>
`;
document.body.appendChild(authModal);

document.getElementById("secret-btn").addEventListener("click", () => {
    if (document.getElementById("secret-pass").value === "alam2026") {
        authModal.style.display = "none";
        initDashboard();
    } else {
        alert("Mot de passe incorrect.");
    }
});


let fetchedLeads = [];

async function initDashboard() {
    // 1. Initial Page Load Animation (The Reveal)
    const tl = gsap.timeline();
    gsap.set('.fade-up', { y: 30, opacity: 0 });

    tl.to('.secure-header', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
    })
    .to('.ledger-header', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.8');

    // Fetch Leads from Firebase
    try {
        const querySnapshot = await getDocs(collection(db, "leads"));
        const ledgerList = document.getElementById('ledger-list');
        ledgerList.innerHTML = ''; // Clear mock data
        
        if(querySnapshot.empty) {
            ledgerList.innerHTML = '<div style="text-align:center;color:rgba(255,255,255,0.5);padding:2rem;">Aucun lead pour le moment.</div>';
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedLeads.push({ id: doc.id, ...data });

            // Format date
            const dateObj = new Date(data.createdAt);
            const dateStr = isNaN(dateObj) ? "Récemment" : dateObj.toLocaleDateString("fr-FR");

            const row = document.createElement('div');
            row.className = 'lead-row stagger-item';
            row.innerHTML = `
                <div class="col-date data-mono">${dateStr}</div>
                <div class="col-parent">${data.parentName || 'Inconnu'}</div>
                <div class="col-phone data-mono">${data.phone || ''}</div>
                <div class="col-cycle">${data.cycle || ''}</div>
                <div class="col-status"><span class="badge badge-new">${data.status || 'Nouveau'}</span></div>
            `;
            
            // Hover logic
            row.addEventListener('mouseenter', () => ledgerList.classList.add('has-hover'));
            row.addEventListener('mouseleave', () => ledgerList.classList.remove('has-hover'));

            ledgerList.appendChild(row);
        });

        // Animate loaded rows
        gsap.fromTo('.stagger-item', 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' }
        );

        tl.to('.action-footer', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');

    } catch (e) {
        console.error("Error fetching leads", e);
    }

    // 3. Export & Archive Sequence
    const exportBtn = document.getElementById('export-btn');
    const modal = document.getElementById('secure-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmBtn = document.getElementById('confirm-export-btn');

    exportBtn.addEventListener('click', () => modal.classList.add('active'));
    cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

    confirmBtn.addEventListener('click', async () => {
        modal.classList.remove('active');

        // CSV Generation
        if(fetchedLeads.length > 0) {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "ID,Date,Parent,Telephone,Cycle,Statut\n";
            fetchedLeads.forEach(lead => {
                let row = `"${lead.id}","${lead.createdAt}","${lead.parentName}","${lead.phone}","${lead.cycle}","${lead.status}"`;
                csvContent += row + "\r\n";
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "inscriptions_export_" + new Date().getTime() + ".csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Wipe database (delete all fetched docs)
            for (const lead of fetchedLeads) {
                await deleteDoc(doc(db, "leads", lead.id));
            }
        }

        const archiveTl = gsap.timeline();
        archiveTl.to(['.ledger-header', '.action-footer'], {
            opacity: 0, y: 10, duration: 0.4, ease: 'power2.in'
        })
        .to('.lead-row', {
            y: 40, opacity: 0, scale: 0.98, duration: 0.5, stagger: 0.05, ease: 'power3.in'
        }, '-=0.2')
        .to('.success-line', {
            width: '200px', duration: 0.8, ease: 'power4.inOut'
        })
        .to('.success-message', {
            opacity: 1, duration: 0.1
        }, '-=0.4')
        .to('.success-text', {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
        }, '-=0.4');
    });
}
