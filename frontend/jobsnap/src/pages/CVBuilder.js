'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // adaugă useNavigate pentru redirecționare
import CVTemplate from '../components/CVTemplate';
import html2pdf from 'html2pdf.js'; // Importăm biblioteca pentru export PDF
import axios from 'axios'; // Pentru interacțiuni cu backend-ul
import { useAuth } from '../context/AuthContext'; // Pentru a obține user_id din context

export default function CVBuilder() {
    const { cvType } = useParams();  // Preluăm tipul de CV din ruta curentă
    const { user } = useAuth(); // Obținem user-ul din contextul de autentificare
    const navigate = useNavigate(); // Folosim useNavigate pentru redirecționare după salvare

    // console.log("CV Type:", cvType);  // Verifică în consola browser-ului dacă preiei corect tipul de CV

    // Configurarea câmpurilor pe baza tipului de CV
    const cvFields = {
        it: [
            { label: "Full Name", name: "fullName", placeholder: "John Doe" },
            { label: "Email", name: "email", placeholder: "example@email.com" },
            { label: "Phone", name: "phone", placeholder: "+123 456 7890" },
            { label: "Summary", name: "summary", placeholder: "Write a brief summary about yourself.", type: "textarea" },
            { label: "Education", name: "education", placeholder: "Add your educational background here.", type: "textarea" },
            { label: "Experience", name: "experience", placeholder: "Describe your work experience here.", type: "textarea" },
            { label: "Technical Skills", name: "skills", placeholder: "e.g., JavaScript, React, Node.js" },
            { label: "Technologies", name: "technologies", placeholder: "e.g., Python, JavaScript" },
            { label: "Certifications", name: "certifications", placeholder: "e.g., AWS Certified Developer", type: "textarea" },
            { label: "Projects", name: "projects", placeholder: "Describe your personal or work-related projects.", type: "textarea" },
        ],
        business: [
            { label: "Full Name", name: "fullName", placeholder: "John Doe" },
            { label: "Email", name: "email", placeholder: "example@email.com" },
            { label: "Phone", name: "phone", placeholder: "+123 456 7890" },
            { label: "Summary", name: "summary", placeholder: "Write a brief summary about yourself.", type: "textarea" },
            { label: "Education", name: "education", placeholder: "Add your educational background here.", type: "textarea" },
            { label: "Work Experience", name: "experience", placeholder: "Describe your work experience here.", type: "textarea" },
            { label: "Business Skills", name: "skills", placeholder: "e.g., Leadership, Management, Negotiation" },
            { label: "Certifications", name: "certifications", placeholder: "e.g., MBA, PMP", type: "textarea" },
            { label: "Projects", name: "projects", placeholder: "Describe any business-related projects.", type: "textarea" },
        ],
        marketing: [
            { label: "Full Name", name: "fullName", placeholder: "John Doe" },
            { label: "Email", name: "email", placeholder: "example@email.com" },
            { label: "Phone", name: "phone", placeholder: "+123 456 7890" },
            { label: "Summary", name: "summary", placeholder: "Write a brief summary about yourself.", type: "textarea" },
            { label: "Education", name: "education", placeholder: "Add your educational background here.", type: "textarea" },
            { label: "Work Experience", name: "experience", placeholder: "Describe your work experience here.", type: "textarea" },
            { label: "Marketing Skills", name: "skills", placeholder: "e.g., SEO, SEM, Google Ads" },
            { label: "Marketing Tools", name: "tools", placeholder: "e.g., Google Analytics, HubSpot" },
            { label: "Campaign Experience", name: "campaignExperience", placeholder: "Describe your campaign experience here.", type: "textarea" },
            { label: "Target Audience", name: "targetAudience", placeholder: "Who were the target audiences for your campaigns?", type: "textarea" },
            { label: "Certifications", name: "certifications", placeholder: "e.g., Google Ads, Facebook Blueprint", type: "textarea" },
            { label: "Projects", name: "projects", placeholder: "Describe any marketing-related projects.", type: "textarea" },
        ],
        healthcare: [
            { label: "Full Name", name: "fullName", placeholder: "John Doe" },
            { label: "Email", name: "email", placeholder: "example@email.com" },
            { label: "Phone", name: "phone", placeholder: "+123 456 7890" },
            { label: "Summary", name: "summary", placeholder: "Write a brief summary about yourself.", type: "textarea" },
            { label: "Education", name: "education", placeholder: "Add your healthcare-related educational background here.", type: "textarea" },
            { label: "Work Experience", name: "experience", placeholder: "Describe your healthcare-related work experience here.", type: "textarea" },
            { label: "Healthcare Skills", name: "skills", placeholder: "e.g., Patient Care, Medical Coding, Medical Terminology" },
            { label: "Healthcare Tools", name: "tools", placeholder: "e.g., Electronic Health Records (EHR), Medical Billing Software" },
            { label: "Clinical Experience", name: "clinicalExperience", placeholder: "Describe your clinical experience here.", type: "textarea" },
            { label: "Certifications", name: "certifications", placeholder: "e.g., CPR, Certified Nursing Assistant", type: "textarea" },
            { label: "Medical Projects", name: "projects", placeholder: "Describe any healthcare-related projects or initiatives.", type: "textarea" },
        ],
        education: [
            { label: "Full Name", name: "fullName", placeholder: "John Doe" },
            { label: "Email", name: "email", placeholder: "example@email.com" },
            { label: "Phone", name: "phone", placeholder: "+123 456 7890" },
            { label: "Summary", name: "summary", placeholder: "Write a brief summary about yourself.", type: "textarea" },
            { label: "Education", name: "education", placeholder: "Add your educational background here.", type: "textarea" },
            { label: "Degree", name: "degree", placeholder: "e.g., Bachelor of Marketing" },
            { label: "Awards", name: "awards", placeholder: "e.g., Dean's List, Top Graduate" },
        ],
        graphicdesign: [
            { label: "Full Name", name: "fullName", placeholder: "John Doe" },
            { label: "Email", name: "email", placeholder: "example@email.com" },
            { label: "Phone", name: "phone", placeholder: "+123 456 7890" },
            { label: "Summary", name: "summary", placeholder: "Write a brief summary about yourself.", type: "textarea" },
            { label: "Education", name: "education", placeholder: "Add your graphic design-related educational background here.", type: "textarea" },
            { label: "Work Experience", name: "experience", placeholder: "Describe your graphic design-related work experience here.", type: "textarea" },
            { label: "Design Skills", name: "skills", placeholder: "e.g., Adobe Illustrator, Photoshop, Sketch" },
            { label: "Design Tools", name: "tools", placeholder: "e.g., InDesign, Figma, After Effects" },
            { label: "Portfolio", name: "portfolio", placeholder: "Link to your design portfolio", type: "textarea" },
            { label: "Certifications", name: "certifications", placeholder: "e.g., Adobe Certified Expert", type: "textarea" },
            { label: "Projects", name: "projects", placeholder: "Describe any graphic design projects.", type: "textarea" },
        ],
    };

    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);

    // Setăm câmpurile în funcție de tipul de CV selectat
    useEffect(() => {
        console.log('CV Type:', cvType); // Verifică ce valoare are cvType
        if (cvFields[cvType]) {
            const fields = cvFields[cvType].reduce((acc, field) => {
                acc[field.name] = '';
                return acc;
            }, {});
            setFormData(fields);
        } else {
            console.log('Invalid cvType:', cvType);  // Verifică dacă există tipul de CV
        }

        // Încarcă datele salvate la profil
        axios.get('http://localhost:8080/api/cv-templates')
            .then(response => {
                setFormData(response.data); // Salvează datele în starea componentelor
            })
            .catch(error => {
                console.error('Error loading CV data:', error);
            });
    }, [cvType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Store the image URL in state
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleSaveCV = () => {
    //     const cvData = { ...formData, userId: user.id }; // Adăugăm userId
    //     console.log(cvData)
    //     // Verifică dacă există o imagine
    //     if (image) {
    //         cvData.image = image; // Adăugăm imaginea
    //     }
    //
    //     fetch('http://localhost:8080/api/cv-templates', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(cvData),
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Error saving CV');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log('CV saved:', data);
    //             navigate('/profile'); // Redirecționează utilizatorul după salvare
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // };

    const handleSaveCV = async () => {
        const cvData = {
            fullName: formData.fullName || 'N/A',  // Dacă este gol, se trimite 'N/A'
            email: formData.email || 'N/A',
            phone: formData.phone || 'N/A',
            summary: formData.summary || 'N/A',
            education: formData.education || 'N/A',  // Asigură-te că câmpurile nu sunt null
            experience: formData.experience || 'N/A',
            skills: formData.skills || 'N/A',
            technologies: formData.technologies || 'N/A',
            certifications: formData.certifications || 'N/A',
            projects: formData.projects || 'N/A',
            tools:formData.tools || 'N/A',
            campaignExperience:formData.campaignExperience|| 'N/A',
            targetAudience:formData.targetAudience|| 'N/A',
            portfolio:formData.portfolio|| 'N/A',
            clinicalExperience:formData.clinicalExperience|| 'N/A',
            degree:formData.degree|| 'N/A',
            awards:formData.awards|| 'N/A',
            cvType:cvType,
            userId: user.id,  // Asigură-te că userId este valid
        };

        console.log("CV Data being sent:", cvData);  // Verifică ce date sunt trimise în backend

        try {
            const response = await axios.post('http://localhost:8080/api/cv', cvData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('CV a fost adaugat cu succes');
        } catch (error) {
            console.error("Error adding cv:", error);
            alert('A apărut o eroare la adăugarea CV-ului.');
        }
    };



    const handleDownloadPDF = () => {
        const element = document.getElementById('cv-preview');
        const options = {
            filename: `${formData.fullName || 'My-CV'}.pdf`,
            jsPDF: { unit: 'pt', format: 'a4' },
            html2canvas: { scale: 3 },
        };

        html2pdf().set(options).from(element).save();
    };

    return (
        <div className="min-h-screen py-20 bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                Start Building Your {cvType ? cvType.charAt(0).toUpperCase() + cvType.slice(1) : 'CV'} CV
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl px-4">
                {/* Form Section */}
                <form className="bg-white shadow-xl rounded-lg p-8 w-full lg:w-1/2 space-y-6 border-2 border-gray-200">
                    <div className="space-y-4">
                        {cvFields[cvType]?.map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                        placeholder={field.placeholder}
                                        rows="3"
                                    ></textarea>
                                ) : (
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Your Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            />
                        </div>
                    </div>
                </form>

                {/* Preview Section */}
                <div id="cv-preview" className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                    <CVTemplate formData={formData} image={image} cvType={cvType} />
                </div>
            </div>

            {/* Save CV Button */}
            <button
                onClick={handleSaveCV}
                className="mt-8 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
                Save CV
            </button>

            {/* Download PDF Button */}
            <button
                onClick={handleDownloadPDF}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            >
                Download CV as PDF
            </button>
        </div>
    );
}
