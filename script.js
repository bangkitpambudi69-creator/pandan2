
        // Global variables
        let isLoggedIn = false;
        let currentPage = 'beranda';
        let currentAdminSection = 'sekolah';
        let agendaData = [];
        let informasiData = [];
        let galeriData = [];
        let guruData = [];
        let spmb_open = false;
        let spmb_registrants = [];
        let whatsappNumber = '';
        let schoolLogo = null;
        let schoolImage = null;
        let messagesData = [];
        let kelasData = [];
        let prestasiData = [];
        let dataSekolah = {
            npsn: '',
            status: '',
            akreditasi: '',
            tahunAkreditasi: '',
            skAkreditasi: null
        };
        let programData = [];
        let socialMedia = {
            facebook: '',
            instagram: '',
            youtube: '',
            twitter: ''
        };
        let spmbInfo = {
            startDate: '',
            endDate: '',
            requirements: '',
            testSchedule: '',
            fee: '',
            additionalInfo: '',
            contactPhone: '',
            contactEmail: ''
        };

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Ensure beranda page is visible on load
            setTimeout(() => {
                showPage('beranda');
                updateWhatsAppButton();
                initScrollReveal();
            }, 100);
        });

        // Scroll Reveal Animation
        function initScrollReveal() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);

            // Observe all elements with reveal class
            document.querySelectorAll('.reveal').forEach(el => {
                observer.observe(el);
            });
        }

        // Navigation functions
        function showPage(page) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
            
            // Show selected page
            const targetPage = document.getElementById(`page-${page}`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
            }
            
            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-blue-600', 'font-bold');
                link.classList.add('text-gray-700');
            });
            
            // Hide mobile menu after selection
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            currentPage = page;
            
            // Trigger scroll reveal for new page
            setTimeout(() => {
                initScrollReveal();
            }, 100);
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Login functions
        function showLoginModal() {
            document.getElementById('login-modal').classList.remove('hidden');
        }

        function hideLoginModal() {
            document.getElementById('login-modal').classList.add('hidden');
            document.getElementById('login-form').reset();
        }

        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'admin123') {
                isLoggedIn = true;
                hideLoginModal();
                showAdminPanel();
            } else {
                alert('Username atau password salah!');
            }
        });

        function showAdminPanel() {
            document.getElementById('admin-panel').classList.add('active');
            showAdminSection('sekolah');
        }

        function logout() {
            isLoggedIn = false;
            document.getElementById('admin-panel').classList.remove('active');
        }

        function showAdminSection(section) {
            // Hide all admin sections
            document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
            
            // Show selected section
            document.getElementById(`admin-${section}`).classList.remove('hidden');
            
            // Update nav buttons
            document.querySelectorAll('.admin-nav-btn').forEach(btn => {
                btn.classList.remove('bg-blue-100', 'text-blue-700');
            });
            event.target.classList.add('bg-blue-100', 'text-blue-700');
            
            currentAdminSection = section;
        }

        // School settings functions
        function toggleLogoType() {
            const logoType = document.querySelector('input[name="logo-type"]:checked').value;
            const selectElement = document.getElementById('school-logo-select');
            const uploadElement = document.getElementById('school-logo-upload');
            
            if (logoType === 'icon') {
                selectElement.disabled = false;
                uploadElement.disabled = true;
                updateSchoolLogo();
            } else {
                selectElement.disabled = true;
                uploadElement.disabled = false;
            }
        }

        function updateSchoolLogo() {
            const logoType = document.querySelector('input[name="logo-type"]:checked').value;
            const logoElement = document.getElementById('school-logo');
            
            if (logoType === 'icon') {
                const logoClass = document.getElementById('school-logo-select').value;
                logoElement.className = logoClass + ' text-white text-2xl';
                logoElement.style.backgroundImage = '';
                logoElement.style.backgroundSize = '';
                logoElement.style.backgroundPosition = '';
                logoElement.style.backgroundRepeat = '';
            }
        }

        function uploadSchoolLogo() {
            const file = document.getElementById('school-logo-upload').files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    schoolLogo = e.target.result;
                    const logoElement = document.getElementById('school-logo');
                    logoElement.className = 'text-white text-2xl';
                    logoElement.style.backgroundImage = `url(${schoolLogo})`;
                    logoElement.style.backgroundSize = 'cover';
                    logoElement.style.backgroundPosition = 'center';
                    logoElement.style.backgroundRepeat = 'no-repeat';
                    logoElement.innerHTML = '';
                };
                reader.readAsDataURL(file);
            }
        }



        function uploadSchoolImage() {
            const file = document.getElementById('school-image-upload').files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    schoolImage = e.target.result;
                    const heroSection = document.getElementById('hero-section');
                    heroSection.style.backgroundImage = `url(${schoolImage})`;
                };
                reader.readAsDataURL(file);
            }
        }

        function updateSchoolMotto() {
            const motto = document.getElementById('school-motto-input').value;
            document.getElementById('school-motto').textContent = motto;
            document.getElementById('hero-motto').textContent = motto;
        }

        function updatePrincipalWelcome() {
            const welcome = document.getElementById('principal-welcome-input').value;
            const welcomeDiv = document.getElementById('principal-welcome');
            if (welcome.trim()) {
                welcomeDiv.innerHTML = welcome.split('\n').map(p => `<p class="mb-4">${p}</p>`).join('');
            } else {
                welcomeDiv.innerHTML = '<p class="text-center text-gray-500 italic">Sambutan kepala sekolah akan diisi oleh admin</p>';
            }
        }

        function updatePrincipalName() {
            const name = document.getElementById('principal-name-input').value;
            document.getElementById('principal-name').textContent = name || 'Kepala Sekolah';
        }

        function updateWhatsAppNumber() {
            whatsappNumber = document.getElementById('whatsapp-number').value;
            updateWhatsAppButton();
        }

        function updateWhatsAppButton() {
            const btn = document.getElementById('whatsapp-btn');
            const whatsappDisplay = document.getElementById('school-whatsapp-display');
            
            if (whatsappNumber) {
                btn.href = `https://wa.me/${whatsappNumber}`;
                btn.style.display = 'flex';
                btn.style.alignItems = 'center';
                whatsappDisplay.textContent = `+${whatsappNumber}`;
            } else {
                // Show WhatsApp button even without number for demo
                btn.style.display = 'flex';
                btn.style.alignItems = 'center';
                whatsappDisplay.textContent = 'Akan diatur oleh admin';
            }
        }

        function contactWhatsApp() {
            if (whatsappNumber) {
                window.open(`https://wa.me/${whatsappNumber}`, '_blank');
            } else {
                alert('Nomor WhatsApp belum diatur oleh admin');
            }
        }

        function updateSocialMedia() {
            socialMedia.facebook = document.getElementById('facebook-url').value;
            socialMedia.instagram = document.getElementById('instagram-url').value;
            socialMedia.youtube = document.getElementById('youtube-url').value;
            socialMedia.twitter = document.getElementById('twitter-url').value;
            
            updateSocialMediaDisplay();
        }

        function updateSocialMediaDisplay() {
            const container = document.getElementById('social-media-links');
            const contactContainer = document.getElementById('contact-social-media');
            const links = [];
            
            if (socialMedia.facebook) {
                links.push(`<a href="${socialMedia.facebook}" target="_blank" class="text-blue-400 hover:text-blue-300 text-2xl transition-colors"><i class="fab fa-facebook"></i></a>`);
            }
            if (socialMedia.instagram) {
                links.push(`<a href="${socialMedia.instagram}" target="_blank" class="text-pink-400 hover:text-pink-300 text-2xl transition-colors"><i class="fab fa-instagram"></i></a>`);
            }
            if (socialMedia.youtube) {
                links.push(`<a href="${socialMedia.youtube}" target="_blank" class="text-red-400 hover:text-red-300 text-2xl transition-colors"><i class="fab fa-youtube"></i></a>`);
            }
            if (socialMedia.twitter) {
                links.push(`<a href="${socialMedia.twitter}" target="_blank" class="text-blue-300 hover:text-blue-200 text-2xl transition-colors"><i class="fab fa-twitter"></i></a>`);
            }
            
            if (links.length > 0) {
                container.innerHTML = links.join('');
                contactContainer.innerHTML = links.join('');
            } else {
                container.innerHTML = '<p class="text-gray-400 italic">Sosial media akan diatur oleh admin</p>';
                contactContainer.innerHTML = '<p class="text-gray-400 italic">Sosial media akan diatur oleh admin</p>';
            }
        }

        // Profile management functions
        function updateVisiMisi() {
            const content = document.getElementById('visi-misi-input').value;
            const contentDiv = document.getElementById('visi-misi-content');
            if (content.trim()) {
                contentDiv.innerHTML = content.split('\n').map(p => `<p class="mb-4">${p}</p>`).join('');
            } else {
                contentDiv.innerHTML = '<p class="text-center text-gray-500 italic">Konten akan diisi oleh admin</p>';
            }
        }

        function updateSejarah() {
            const content = document.getElementById('sejarah-input').value;
            const contentDiv = document.getElementById('sejarah-content');
            if (content.trim()) {
                contentDiv.innerHTML = content.split('\n').map(p => `<p class="mb-4">${p}</p>`).join('');
            } else {
                contentDiv.innerHTML = '<p class="text-center text-gray-500 italic">Konten akan diisi oleh admin</p>';
            }
        }

        function updatePrestasi() {
            updatePrestasiProfileDisplay();
        }

        function updatePrestasiProfileDisplay() {
            const contentDiv = document.getElementById('prestasi-content');
            
            if (prestasiData.length === 0) {
                contentDiv.innerHTML = `
                    <div class="text-center py-12 text-gray-500">
                        <div class="w-24 h-24 mx-auto gradient-warm rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-trophy text-white text-3xl"></i>
                        </div>
                        <p class="text-xl font-semibold mb-2">Belum ada data prestasi</p>
                        <p class="text-gray-400">Data prestasi sekolah akan diisi oleh admin</p>
                    </div>
                `;
                return;
            }
            
            // Group by year
            const prestasiByYear = prestasiData.reduce((acc, prestasi) => {
                if (!acc[prestasi.tahun]) {
                    acc[prestasi.tahun] = [];
                }
                acc[prestasi.tahun].push(prestasi);
                return acc;
            }, {});
            
            const years = Object.keys(prestasiByYear).sort((a, b) => b - a);
            
            contentDiv.innerHTML = `
                <div class="mb-8 p-6 bg-yellow-50 rounded-2xl text-center">
                    <div class="text-3xl font-bold text-yellow-800 mb-2">${prestasiData.length}</div>
                    <p class="text-yellow-600 font-semibold">Total Prestasi Sekolah</p>
                </div>
                
                ${years.map(year => `
                    <div class="mb-8">
                        <h4 class="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-yellow-300 pb-3">
                            <i class="fas fa-calendar-alt text-yellow-600 mr-2"></i>
                            Tahun ${year}
                        </h4>
                        <div class="grid md:grid-cols-2 gap-6">
                            ${prestasiByYear[year].map((prestasi, index) => `
                                <div class="card-modern p-6 hover:shadow-xl transition-all duration-300 reveal" style="animation-delay: ${index * 0.1}s;">
                                    <div class="flex items-start justify-between mb-4">
                                        <div class="flex-1">
                                            <h5 class="text-lg font-bold text-gray-800 mb-3">${prestasi.nama}</h5>
                                            <div class="flex flex-wrap gap-2">
                                                <span class="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
                                                    <i class="fas fa-medal mr-1"></i>${prestasi.juara}
                                                </span>
                                                <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                                                    <i class="fas fa-map-marker-alt mr-1"></i>${prestasi.tingkat}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="text-3xl text-yellow-500 ml-4">
                                            <i class="fas fa-trophy"></i>
                                        </div>
                                    </div>
                                    <div class="border-t pt-4">
                                        <div class="flex items-center text-gray-500 text-sm">
                                            <i class="fas fa-star text-yellow-400 mr-2"></i>
                                            <span>Prestasi Tingkat ${prestasi.tingkat}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            `;
        }



        // Agenda management functions
        function addAgenda() {
            const date = document.getElementById('agenda-date').value;
            const title = document.getElementById('agenda-title').value;
            const desc = document.getElementById('agenda-desc').value;
            
            if (!date || !title || !desc) {
                alert('Semua field harus diisi!');
                return;
            }
            
            const agenda = {
                id: Date.now(),
                date: date,
                title: title,
                description: desc
            };
            
            agendaData.push(agenda);
            updateAgendaDisplay();
            
            // Clear form
            document.getElementById('agenda-date').value = '';
            document.getElementById('agenda-title').value = '';
            document.getElementById('agenda-desc').value = '';
        }

        function deleteAgenda(id) {
            agendaData = agendaData.filter(agenda => agenda.id !== id);
            updateAgendaDisplay();
        }

        function updateAgendaDisplay() {
            const publicList = document.getElementById('agenda-list');
            const adminList = document.getElementById('admin-agenda-list');
            
            if (agendaData.length === 0) {
                publicList.innerHTML = '<p class="text-center text-gray-500 italic py-8">Belum ada agenda yang ditambahkan</p>';
                adminList.innerHTML = '<p class="text-gray-500 italic">Belum ada agenda yang ditambahkan</p>';
                return;
            }
            
            // Sort by date
            const sortedAgenda = agendaData.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // Public display
            publicList.innerHTML = sortedAgenda.map((agenda, index) => `
                <div class="card-modern p-6 reveal" style="animation-delay: ${index * 0.1}s;">
                    <div class="flex flex-col lg:flex-row lg:items-center gap-6">
                        <div class="flex-shrink-0">
                            <div class="w-20 h-20 gradient-success rounded-2xl flex items-center justify-center">
                                <i class="fas fa-calendar-day text-white text-2xl"></i>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                                <h4 class="text-xl font-bold text-gray-800 mb-2 lg:mb-0">${agenda.title}</h4>
                                <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                    <i class="fas fa-clock mr-2"></i>
                                    ${new Date(agenda.date).toLocaleDateString('id-ID')}
                                </div>
                            </div>
                            <p class="text-gray-600 text-lg leading-relaxed">${agenda.description}</p>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Admin display
            adminList.innerHTML = sortedAgenda.map(agenda => `
                <div class="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <div class="font-semibold text-gray-800">${agenda.title}</div>
                        <div class="text-sm text-gray-600">${new Date(agenda.date).toLocaleDateString('id-ID')} - ${agenda.description}</div>
                    </div>
                    <button onclick="deleteAgenda(${agenda.id})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }

        // Information management functions
        function addInformasi() {
            const title = document.getElementById('info-title').value;
            const content = document.getElementById('info-content').value;
            const important = document.getElementById('info-important').checked;
            const photo = document.getElementById('info-photo').files[0];
            
            if (!title || !content) {
                alert('Judul dan isi informasi harus diisi!');
                return;
            }
            
            if (photo) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const info = {
                        id: Date.now(),
                        title: title,
                        content: content,
                        important: important,
                        photo: e.target.result,
                        date: new Date().toLocaleDateString('id-ID')
                    };
                    
                    informasiData.push(info);
                    updateInformasiDisplay();
                    updateAnnouncementBanner();
                    clearInformasiForm();
                };
                reader.readAsDataURL(photo);
            } else {
                const info = {
                    id: Date.now(),
                    title: title,
                    content: content,
                    important: important,
                    photo: null,
                    date: new Date().toLocaleDateString('id-ID')
                };
                
                informasiData.push(info);
                updateInformasiDisplay();
                updateAnnouncementBanner();
                clearInformasiForm();
            }
        }

        function clearInformasiForm() {
            document.getElementById('info-title').value = '';
            document.getElementById('info-content').value = '';
            document.getElementById('info-photo').value = '';
            document.getElementById('info-important').checked = false;
        }

        function deleteInformasi(id) {
            informasiData = informasiData.filter(info => info.id !== id);
            updateInformasiDisplay();
            updateAnnouncementBanner();
        }

        function updateInformasiDisplay() {
            const publicList = document.getElementById('informasi-list');
            const adminList = document.getElementById('admin-informasi-list');
            
            if (informasiData.length === 0) {
                publicList.innerHTML = '<p class="text-center text-gray-500 italic py-8">Belum ada informasi yang ditambahkan</p>';
                adminList.innerHTML = '<p class="text-gray-500 italic">Belum ada informasi yang ditambahkan</p>';
                return;
            }
            
            // Sort by date (newest first)
            const sortedInfo = informasiData.sort((a, b) => b.id - a.id);
            
            // Public display
            publicList.innerHTML = sortedInfo.map(info => `
                <div class="border rounded-lg p-6 ${info.important ? 'border-red-300 bg-red-50' : 'border-gray-200'}">
                    <div class="flex items-start justify-between mb-3">
                        <h4 class="text-xl font-semibold text-gray-800">${info.title}</h4>
                        ${info.important ? '<span class="bg-red-500 text-white px-2 py-1 rounded text-sm">Penting</span>' : ''}
                    </div>
                    ${info.photo ? `<img src="${info.photo}" alt="${info.title}" class="w-full h-48 object-cover rounded-lg mb-4">` : ''}
                    <p class="text-gray-600 mb-3">${info.content}</p>
                    <p class="text-sm text-gray-500">${info.date}</p>
                </div>
            `).join('');
            
            // Admin display
            adminList.innerHTML = sortedInfo.map(info => `
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <div class="font-semibold text-gray-800">${info.title} ${info.important ? '<span class="text-red-500">(Penting)</span>' : ''}</div>
                            ${info.photo ? `<img src="${info.photo}" alt="${info.title}" class="w-20 h-20 object-cover rounded mt-2">` : ''}
                            <div class="text-sm text-gray-600 mt-1">${info.content}</div>
                            <div class="text-xs text-gray-500 mt-2">${info.date}</div>
                        </div>
                        <button onclick="deleteInformasi(${info.id})" class="text-red-600 hover:text-red-800 ml-4">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function updateAnnouncementBanner() {
            const importantInfo = informasiData.filter(info => info.important);
            const banner = document.getElementById('announcement-banner');
            const text = document.getElementById('announcement-text');
            
            if (importantInfo.length > 0) {
                // Show the latest important announcement
                const latest = importantInfo.sort((a, b) => b.id - a.id)[0];
                text.textContent = latest.title;
                banner.classList.remove('hidden');
            } else {
                banner.classList.add('hidden');
            }
        }

        // Gallery management functions
        function addGaleri() {
            const title = document.getElementById('galeri-title').value;
            const file = document.getElementById('galeri-file').files[0];
            
            if (!title || !file) {
                alert('Judul dan file harus diisi!');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const galeri = {
                    id: Date.now(),
                    title: title,
                    file: e.target.result,
                    type: file.type.startsWith('image/') ? 'image' : 'video'
                };
                
                galeriData.push(galeri);
                updateGaleriDisplay();
            };
            reader.readAsDataURL(file);
            
            // Clear form
            document.getElementById('galeri-title').value = '';
            document.getElementById('galeri-file').value = '';
        }

        function deleteGaleri(id) {
            galeriData = galeriData.filter(item => item.id !== id);
            updateGaleriDisplay();
        }

        function updateGaleriDisplay() {
            const publicGrid = document.getElementById('galeri-grid');
            const adminList = document.getElementById('admin-galeri-list');
            
            if (galeriData.length === 0) {
                publicGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 italic py-8">Belum ada foto/video yang ditambahkan</p>';
                adminList.innerHTML = '<p class="col-span-full text-gray-500 italic">Belum ada foto/video yang ditambahkan</p>';
                return;
            }
            
            // Public display
            publicGrid.innerHTML = galeriData.map((item, index) => `
                <div class="card-modern overflow-hidden reveal" style="animation-delay: ${index * 0.1}s;">
                    <div class="relative group">
                        ${item.type === 'image' ? 
                            `<img src="${item.file}" alt="${item.title}" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110">` :
                            `<video src="${item.file}" class="w-full h-64 object-cover" controls></video>`
                        }
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-${item.type === 'image' ? 'image' : 'video'} text-sm"></i>
                                <span class="text-sm font-medium">${item.type === 'image' ? 'Foto' : 'Video'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h4 class="text-lg font-bold text-gray-800 mb-2">${item.title}</h4>
                        <div class="flex items-center text-gray-500 text-sm">
                            <i class="fas fa-calendar mr-2"></i>
                            <span>Ditambahkan baru-baru ini</span>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Admin display
            adminList.innerHTML = galeriData.map(item => `
                <div class="bg-gray-50 rounded-lg overflow-hidden">
                    ${item.type === 'image' ? 
                        `<img src="${item.file}" alt="${item.title}" class="w-full h-32 object-cover">` :
                        `<video src="${item.file}" class="w-full h-32 object-cover"></video>`
                    }
                    <div class="p-3">
                        <div class="font-semibold text-gray-800 text-sm">${item.title}</div>
                        <button onclick="deleteGaleri(${item.id})" class="text-red-600 hover:text-red-800 text-sm mt-2">
                            <i class="fas fa-trash mr-1"></i>Hapus
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Teacher management functions
        function addGuru() {
            const nama = document.getElementById('guru-nama').value;
            const jabatan = document.getElementById('guru-jabatan').value;
            const foto = document.getElementById('guru-foto').files[0];
            
            if (!nama || !jabatan) {
                alert('Nama dan jabatan harus diisi!');
                return;
            }
            
            if (foto) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const guru = {
                        id: Date.now(),
                        nama: nama,
                        jabatan: jabatan,
                        foto: e.target.result
                    };
                    
                    guruData.push(guru);
                    updateGuruDisplay();
                };
                reader.readAsDataURL(foto);
            } else {
                const guru = {
                    id: Date.now(),
                    nama: nama,
                    jabatan: jabatan,
                    foto: null
                };
                
                guruData.push(guru);
                updateGuruDisplay();
            }
            
            // Clear form
            document.getElementById('guru-nama').value = '';
            document.getElementById('guru-jabatan').value = '';
            document.getElementById('guru-foto').value = '';
        }

        function deleteGuru(id) {
            guruData = guruData.filter(guru => guru.id !== id);
            updateGuruDisplay();
        }

        function updateGuruDisplay() {
            const publicGrid = document.getElementById('guru-grid');
            const adminList = document.getElementById('admin-guru-list');
            
            if (guruData.length === 0) {
                publicGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 italic py-8">Belum ada data guru & staf yang ditambahkan</p>';
                adminList.innerHTML = '<p class="col-span-full text-gray-500 italic">Belum ada data guru & staf yang ditambahkan</p>';
                return;
            }
            
            // Public display
            publicGrid.innerHTML = guruData.map((guru, index) => `
                <div class="card-modern p-8 text-center reveal" style="animation-delay: ${index * 0.1}s;">
                    <div class="relative mb-6">
                        <div class="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl">
                            ${guru.foto ? 
                                `<img src="${guru.foto}" alt="${guru.nama}" class="w-full h-full object-cover">` :
                                `<i class="fas fa-user text-white text-4xl"></i>`
                            }
                        </div>
                        <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-white text-sm"></i>
                        </div>
                    </div>
                    <h4 class="text-xl font-bold text-gray-800 mb-3">${guru.nama}</h4>
                    <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-graduation-cap mr-2"></i>
                        ${guru.jabatan}
                    </div>
                    <div class="pt-4 border-t border-gray-100">
                        <div class="flex justify-center space-x-4 text-gray-400">
                            <i class="fas fa-envelope hover:text-blue-500 cursor-pointer transition-colors"></i>
                            <i class="fas fa-phone hover:text-green-500 cursor-pointer transition-colors"></i>
                            <i class="fas fa-user-circle hover:text-purple-500 cursor-pointer transition-colors"></i>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Admin display
            adminList.innerHTML = guruData.map(guru => `
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                            ${guru.foto ? 
                                `<img src="${guru.foto}" alt="${guru.nama}" class="w-full h-full object-cover">` :
                                `<i class="fas fa-user text-white"></i>`
                            }
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold text-gray-800">${guru.nama}</div>
                            <div class="text-sm text-gray-600">${guru.jabatan}</div>
                        </div>
                        <button onclick="deleteGuru(${guru.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // SPMB management functions
        function updateSPMBInfo() {
            spmbInfo.startDate = document.getElementById('spmb-start-date').value;
            spmbInfo.endDate = document.getElementById('spmb-end-date').value;
            spmbInfo.requirements = document.getElementById('spmb-requirements').value;
            spmbInfo.testSchedule = document.getElementById('spmb-test-schedule').value;
            spmbInfo.fee = document.getElementById('spmb-fee').value;
            spmbInfo.additionalInfo = document.getElementById('spmb-additional-info').value;
            spmbInfo.contactPhone = document.getElementById('spmb-contact-phone').value;
            spmbInfo.contactEmail = document.getElementById('spmb-contact-email').value;
            
            updateSPMBDisplay();
        }

        function updateSPMBDisplay() {
            // Schedule display
            const scheduleDisplay = document.getElementById('spmb-schedule-display');
            if (spmbInfo.startDate && spmbInfo.endDate) {
                const startDate = new Date(spmbInfo.startDate).toLocaleDateString('id-ID');
                const endDate = new Date(spmbInfo.endDate).toLocaleDateString('id-ID');
                scheduleDisplay.innerHTML = `<p><strong>Pendaftaran:</strong> ${startDate} - ${endDate}</p>`;
            } else {
                scheduleDisplay.innerHTML = '<p class="italic">Jadwal akan diatur oleh admin</p>';
            }

            // Requirements display
            const requirementsDisplay = document.getElementById('spmb-requirements-display');
            if (spmbInfo.requirements.trim()) {
                requirementsDisplay.innerHTML = spmbInfo.requirements.split('\n').map(req => `<p class="mb-2">• ${req}</p>`).join('');
            } else {
                requirementsDisplay.innerHTML = '<p class="italic">Persyaratan akan diatur oleh admin</p>';
            }

            // Test schedule display
            const testDisplay = document.getElementById('spmb-test-display');
            if (spmbInfo.testSchedule.trim()) {
                testDisplay.innerHTML = spmbInfo.testSchedule.split('\n').map(test => `<p class="mb-2">${test}</p>`).join('');
            } else {
                testDisplay.innerHTML = '<p class="italic">Jadwal tes akan diatur oleh admin</p>';
            }

            // Fee display
            const feeDisplay = document.getElementById('spmb-fee-display');
            if (spmbInfo.fee.trim()) {
                feeDisplay.innerHTML = `<p class="text-lg font-semibold text-yellow-700">${spmbInfo.fee}</p>`;
            } else {
                feeDisplay.innerHTML = '<p class="italic">Biaya akan diatur oleh admin</p>';
            }

            // Additional info display
            const additionalDisplay = document.getElementById('spmb-additional-display');
            if (spmbInfo.additionalInfo.trim()) {
                additionalDisplay.innerHTML = spmbInfo.additionalInfo.split('\n').map(info => `<p class="mb-2">${info}</p>`).join('');
            } else {
                additionalDisplay.innerHTML = '<p class="italic">Informasi tambahan akan diatur oleh admin</p>';
            }

            // Contact display
            const contactDisplay = document.getElementById('spmb-contact-display');
            const contacts = [];
            if (spmbInfo.contactPhone) contacts.push(`<p><i class="fas fa-phone mr-2"></i>${spmbInfo.contactPhone}</p>`);
            if (spmbInfo.contactEmail) contacts.push(`<p><i class="fas fa-envelope mr-2"></i>${spmbInfo.contactEmail}</p>`);
            
            if (contacts.length > 0) {
                contactDisplay.innerHTML = contacts.join('');
            } else {
                contactDisplay.innerHTML = '<p class="italic">Kontak akan diatur oleh admin</p>';
            }
        }

        function toggleSPMB() {
            spmb_open = document.getElementById('spmb-status').checked;
            
            if (spmb_open) {
                document.getElementById('spmb-closed').classList.add('hidden');
                document.getElementById('spmb-open').classList.remove('hidden');
                updateSPMBDisplay();
            } else {
                document.getElementById('spmb-closed').classList.remove('hidden');
                document.getElementById('spmb-open').classList.add('hidden');
            }
        }

        // SPMB form submission
        document.getElementById('spmb-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const registrant = {
                id: Date.now(),
                nama: this.querySelector('input[type="text"]').value,
                tanggal: new Date().toLocaleDateString('id-ID'),
                status: 'Terdaftar'
            };
            
            spmb_registrants.push(registrant);
            updateSPMBRegistrants();
            
            // Show success message and print receipt
            alert('Pendaftaran berhasil! Silakan cetak bukti pendaftaran.');
            printReceipt(registrant);
            
            // Reset form
            this.reset();
        });

        function printReceipt(registrant) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Bukti Pendaftaran SPMB</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .content { margin: 20px 0; }
                        .footer { margin-top: 50px; text-align: right; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>SD NEGERI 2 PANDAN</h2>
                        <h3>BUKTI PENDAFTARAN SPMB</h3>
                    </div>
                    <div class="content">
                        <p><strong>Nomor Pendaftaran:</strong> ${registrant.id}</p>
                        <p><strong>Nama Calon Siswa:</strong> ${registrant.nama}</p>
                        <p><strong>Tanggal Pendaftaran:</strong> ${registrant.tanggal}</p>
                        <p><strong>Status:</strong> ${registrant.status}</p>
                    </div>
                    <div class="footer">
                        <p>Panitia SPMB<br>SD Negeri 2 Pandan</p>
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }

        function updateSPMBRegistrants() {
            const list = document.getElementById('spmb-registrants');
            
            if (spmb_registrants.length === 0) {
                list.innerHTML = '<p class="text-gray-500 italic">Belum ada pendaftar</p>';
                return;
            }
            
            list.innerHTML = spmb_registrants.map(registrant => `
                <div class="bg-white rounded-lg p-4 border">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="font-semibold text-gray-800">${registrant.nama}</div>
                            <div class="text-sm text-gray-600">No. Pendaftaran: ${registrant.id}</div>
                            <div class="text-sm text-gray-600">Tanggal: ${registrant.tanggal}</div>
                        </div>
                        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">${registrant.status}</span>
                    </div>
                </div>
            `).join('');
        }

        // Statistics management
        function updateStatistics() {
            const siswa = document.getElementById('stat-siswa-input').value;
            const guru = document.getElementById('stat-guru-input').value;
            const prestasi = document.getElementById('stat-prestasi-input').value;
            const tahun = document.getElementById('stat-tahun-input').value;

            document.getElementById('stat-siswa').textContent = siswa || '-';
            document.getElementById('stat-guru').textContent = guru || '-';
            document.getElementById('stat-prestasi').textContent = prestasi || '-';
            document.getElementById('stat-tahun').textContent = tahun || '-';
        }

        // Contact info management
        function updateContactInfo() {
            const address = document.getElementById('school-address-input').value;
            const email = document.getElementById('school-email-input').value;
            const hours = document.getElementById('school-hours-input').value;

            document.getElementById('school-address').textContent = address;
            document.getElementById('school-email').textContent = email;
            
            const hoursDiv = document.getElementById('school-hours');
            hoursDiv.innerHTML = hours.split('\n').map(hour => `<p>${hour}</p>`).join('');
        }

        // Contact form handler
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const message = document.getElementById('contact-message').value;
            
            // Save message to data
            const newMessage = {
                id: Date.now(),
                name: name,
                message: message,
                date: new Date().toLocaleDateString('id-ID'),
                time: new Date().toLocaleTimeString('id-ID')
            };
            
            messagesData.push(newMessage);
            updateMessagesDisplay();
            
            // Show success message
            alert('Terima kasih! Pesan Anda telah diterima dan tersimpan. Admin sekolah akan melihat pesan Anda.');
            
            // Reset form
            this.reset();
        });

        // Messages management functions
        function updateMessagesDisplay() {
            const messagesList = document.getElementById('messages-list');
            const totalMessages = document.getElementById('total-messages');
            
            totalMessages.textContent = messagesData.length;
            
            if (messagesData.length === 0) {
                messagesList.innerHTML = `
                    <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-envelope-open-text text-4xl mb-4"></i>
                        <p class="text-lg">Belum ada pesan masuk</p>
                        <p class="text-sm">Pesan dari formulir "Hubungi Kami" akan muncul di sini</p>
                    </div>
                `;
                return;
            }
            
            // Sort messages by newest first
            const sortedMessages = messagesData.sort((a, b) => b.id - a.id);
            
            messagesList.innerHTML = sortedMessages.map(msg => `
                <div class="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <h4 class="text-lg font-semibold text-gray-800 mb-1">${msg.name}</h4>
                            <p class="text-sm text-gray-500">${msg.date} • ${msg.time}</p>
                        </div>
                        <button onclick="deleteMessage(${msg.id})" class="text-red-600 hover:text-red-800 ml-4">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="bg-white rounded-lg p-4 border">
                        <p class="text-gray-700 leading-relaxed">${msg.message}</p>
                    </div>
                </div>
            `).join('');
        }

        function deleteMessage(id) {
            if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
                messagesData = messagesData.filter(msg => msg.id !== id);
                updateMessagesDisplay();
            }
        }

        function clearAllMessages() {
            if (confirm('Apakah Anda yakin ingin menghapus semua pesan? Tindakan ini tidak dapat dibatalkan.')) {
                messagesData = [];
                updateMessagesDisplay();
            }
        }

        // Statistics modal functions
        function showStatDetail(type) {
            const modal = document.getElementById('stat-modal');
            const title = document.getElementById('stat-modal-title');
            const content = document.getElementById('stat-modal-content');
            
            modal.classList.remove('hidden');
            
            switch(type) {
                case 'siswa':
                    title.textContent = 'Data Siswa Per Kelas';
                    content.innerHTML = generateSiswaContent();
                    break;
                case 'guru':
                    title.textContent = 'Daftar Guru & Staf';
                    content.innerHTML = generateGuruContent();
                    break;

                case 'sekolah':
                    title.textContent = 'Data Sekolah & Akreditasi';
                    content.innerHTML = generateDataSekolahContent();
                    break;
                case 'program':
                    title.textContent = 'Program Sekolah';
                    content.innerHTML = generateProgramContent();
                    break;
            }
        }

        function closeStatModal() {
            document.getElementById('stat-modal').classList.add('hidden');
        }

        function generateSiswaContent() {
            if (kelasData.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-users text-4xl mb-4"></i>
                        <p class="text-lg">Belum ada data siswa per kelas</p>
                        <p class="text-sm">Data akan diisi oleh admin sekolah</p>
                    </div>
                `;
            }
            
            const totalSiswaTarget = kelasData.reduce((total, kelas) => total + parseInt(kelas.target), 0);
            const totalSiswaAktual = kelasData.reduce((total, kelas) => total + kelas.siswa.length, 0);
            
            return `
                <div class="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 class="text-lg font-semibold text-blue-800 mb-2">Data Siswa Sekolah</h4>
                    <div class="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                            <div class="text-2xl font-bold text-blue-600">${totalSiswaAktual}</div>
                            <div class="text-sm text-blue-600">Siswa Terdaftar</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-green-600">${totalSiswaTarget}</div>
                            <div class="text-sm text-green-600">Target Kapasitas</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-purple-600">${kelasData.length}</div>
                            <div class="text-sm text-purple-600">Total Kelas</div>
                        </div>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    ${kelasData.map(kelas => `
                        <div class="bg-white border rounded-lg p-4 shadow-sm">
                            <div class="flex justify-between items-center mb-3">
                                <h5 class="text-lg font-bold text-gray-800">Kelas ${kelas.nama}</h5>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    ${kelas.siswa.length}/${kelas.target} siswa
                                </span>
                            </div>
                            <p class="text-gray-600 mb-3"><i class="fas fa-user-tie mr-2"></i>Wali Kelas: ${kelas.wali}</p>
                            
                            <!-- Progress Bar -->
                            <div class="mb-3">
                                <div class="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Kapasitas Kelas</span>
                                    <span>${Math.round((kelas.siswa.length / kelas.target) * 100)}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${(kelas.siswa.length / kelas.target) * 100}%"></div>
                                </div>
                            </div>
                            
                            ${kelas.siswa.length > 0 ? `
                                <div class="border-t pt-3">
                                    <div class="text-sm font-semibold text-gray-700 mb-2">Daftar Siswa:</div>
                                    <div class="max-h-32 overflow-y-auto">
                                        <div class="grid gap-1">
                                            ${kelas.siswa.map((siswa, index) => `
                                                <div class="flex items-center text-sm text-gray-600">
                                                    <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2">
                                                        ${index + 1}
                                                    </span>
                                                    <span>${siswa}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            ` : `
                                <div class="border-t pt-3 text-center text-gray-500 text-sm italic">
                                    Belum ada siswa yang terdaftar
                                </div>
                            `}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function generateGuruContent() {
            if (guruData.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-chalkboard-teacher text-4xl mb-4"></i>
                        <p class="text-lg">Belum ada data guru & staf</p>
                        <p class="text-sm">Data akan diisi oleh admin sekolah</p>
                    </div>
                `;
            }
            
            return `
                <div class="mb-6 p-4 bg-green-50 rounded-lg">
                    <h4 class="text-lg font-semibold text-green-800 mb-2">Total Guru & Staf: ${guruData.length} orang</h4>
                    <p class="text-green-600">Tenaga pendidik dan kependidikan yang berpengalaman</p>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${guruData.map(guru => `
                        <div class="bg-white border rounded-lg p-4 shadow-sm text-center">
                            <div class="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-3">
                                ${guru.foto ? 
                                    `<img src="${guru.foto}" alt="${guru.nama}" class="w-full h-full object-cover">` :
                                    `<i class="fas fa-user text-white text-xl"></i>`
                                }
                            </div>
                            <h5 class="font-bold text-gray-800 mb-1">${guru.nama}</h5>
                            <p class="text-sm text-gray-600">${guru.jabatan}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }



        function generateDataSekolahContent() {
            return `
                <div class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-white border rounded-lg p-6 shadow-sm">
                            <h5 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-id-card text-blue-600 mr-2"></i>
                                Identitas Sekolah
                            </h5>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">NPSN:</span>
                                    <span class="font-semibold">${dataSekolah.npsn || 'Belum diisi'}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Status:</span>
                                    <span class="font-semibold">${dataSekolah.status || 'Belum diisi'}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Tahun Berdiri:</span>
                                    <span class="font-semibold">${document.getElementById('stat-tahun').textContent}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white border rounded-lg p-6 shadow-sm">
                            <h5 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-certificate text-green-600 mr-2"></i>
                                Akreditasi
                            </h5>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Peringkat:</span>
                                    <span class="font-semibold ${dataSekolah.akreditasi === 'A' ? 'text-green-600' : dataSekolah.akreditasi === 'B' ? 'text-blue-600' : 'text-yellow-600'}">${dataSekolah.akreditasi || 'Belum diisi'}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Tahun Akreditasi:</span>
                                    <span class="font-semibold">${dataSekolah.tahunAkreditasi || 'Belum diisi'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ${dataSekolah.skAkreditasi ? `
                        <div class="bg-white border rounded-lg p-6 shadow-sm">
                            <h5 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-file-alt text-purple-600 mr-2"></i>
                                SK Akreditasi
                            </h5>
                            <div class="text-center">
                                ${dataSekolah.skAkreditasi.includes('data:application/pdf') ? 
                                    `<div class="bg-red-50 p-8 rounded-lg">
                                        <i class="fas fa-file-pdf text-red-600 text-4xl mb-4"></i>
                                        <p class="text-gray-700 mb-4">Dokumen SK Akreditasi (PDF)</p>
                                        <a href="${dataSekolah.skAkreditasi}" download="SK_Akreditasi.pdf" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                            <i class="fas fa-download mr-2"></i>Download
                                        </a>
                                    </div>` :
                                    `<img src="${dataSekolah.skAkreditasi}" alt="SK Akreditasi" class="max-w-full h-auto rounded-lg shadow-lg">`
                                }
                            </div>
                        </div>
                    ` : `
                        <div class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <i class="fas fa-file-upload text-gray-400 text-4xl mb-4"></i>
                            <p class="text-gray-500">SK Akreditasi belum diupload</p>
                        </div>
                    `}
                </div>
            `;
        }

        // Kelas management functions
        function addKelas() {
            const nama = document.getElementById('kelas-nama').value;
            const target = document.getElementById('kelas-target').value;
            const wali = document.getElementById('kelas-wali').value;
            
            if (!nama || !target || !wali) {
                alert('Semua field harus diisi!');
                return;
            }
            
            const kelas = {
                id: Date.now(),
                nama: nama,
                target: parseInt(target),
                wali: wali,
                siswa: []
            };
            
            kelasData.push(kelas);
            updateKelasDisplay();
            
            // Clear form
            document.getElementById('kelas-nama').value = '';
            document.getElementById('kelas-target').value = '';
            document.getElementById('kelas-wali').value = '';
        }

        function deleteKelas(id) {
            kelasData = kelasData.filter(kelas => kelas.id !== id);
            updateKelasDisplay();
        }

        function updateKelasDisplay() {
            const adminList = document.getElementById('admin-kelas-list');
            
            if (kelasData.length === 0) {
                adminList.innerHTML = '<p class="text-gray-500 italic">Belum ada data kelas yang ditambahkan</p>';
                return;
            }
            
            adminList.innerHTML = kelasData.map(kelas => `
                <div class="bg-white rounded-lg p-4 border">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <div class="font-semibold text-gray-800 text-lg">Kelas ${kelas.nama}</div>
                            <div class="text-sm text-gray-600 mb-2">Wali Kelas: ${kelas.wali}</div>
                            <div class="flex items-center space-x-2">
                                <span class="text-sm font-medium text-blue-600">${kelas.siswa.length}/${kelas.target} siswa</span>
                                <div class="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${Math.min((kelas.siswa.length / kelas.target) * 100, 100)}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="manageSiswa(${kelas.id})" class="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                <i class="fas fa-users mr-1"></i>Siswa
                            </button>
                            <button onclick="deleteKelas(${kelas.id})" class="text-red-600 hover:text-red-800 p-2">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    ${kelas.siswa.length > 0 ? `
                        <div class="border-t pt-3">
                            <div class="text-xs text-gray-500 mb-2">Siswa terbaru:</div>
                            <div class="flex flex-wrap gap-1">
                                ${kelas.siswa.slice(-3).map(siswa => `
                                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">${siswa}</span>
                                `).join('')}
                                ${kelas.siswa.length > 3 ? `<span class="text-xs text-gray-500">+${kelas.siswa.length - 3} lainnya</span>` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `).join('');
        }

        // Prestasi management functions
        function addPrestasi() {
            const nama = document.getElementById('prestasi-nama').value;
            const juara = document.getElementById('prestasi-juara').value;
            const tahun = document.getElementById('prestasi-tahun').value;
            const tingkat = document.getElementById('prestasi-tingkat').value;
            
            if (!nama || !juara || !tahun || !tingkat) {
                alert('Semua field harus diisi!');
                return;
            }
            
            const prestasi = {
                id: Date.now(),
                nama: nama,
                juara: juara,
                tahun: tahun,
                tingkat: tingkat
            };
            
            prestasiData.push(prestasi);
            updatePrestasiDisplay();
            
            // Clear form
            document.getElementById('prestasi-nama').value = '';
            document.getElementById('prestasi-juara').value = '';
            document.getElementById('prestasi-tahun').value = '';
            document.getElementById('prestasi-tingkat').value = '';
        }

        function deletePrestasi(id) {
            prestasiData = prestasiData.filter(prestasi => prestasi.id !== id);
            updatePrestasiDisplay();
        }

        function updatePrestasiDisplay() {
            const adminList = document.getElementById('admin-prestasi-list');
            
            if (prestasiData.length === 0) {
                adminList.innerHTML = '<p class="text-gray-500 italic">Belum ada data prestasi yang ditambahkan</p>';
                return;
            }
            
            adminList.innerHTML = prestasiData.map(prestasi => `
                <div class="bg-white rounded-lg p-4 flex justify-between items-center border">
                    <div>
                        <div class="font-semibold text-gray-800">${prestasi.nama}</div>
                        <div class="text-sm text-gray-600">${prestasi.juara} • ${prestasi.tingkat} • ${prestasi.tahun}</div>
                    </div>
                    <button onclick="deletePrestasi(${prestasi.id})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
            
            // Update profile display
            updatePrestasiProfileDisplay();
        }

        // Data sekolah management functions
        function updateDataSekolah() {
            dataSekolah.npsn = document.getElementById('sekolah-npsn').value;
            dataSekolah.status = document.getElementById('sekolah-status').value;
            dataSekolah.akreditasi = document.getElementById('sekolah-akreditasi').value;
            dataSekolah.tahunAkreditasi = document.getElementById('sekolah-tahun-akreditasi').value;
        }

        function uploadSKAkreditasi() {
            const file = document.getElementById('sk-akreditasi-upload').files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    dataSekolah.skAkreditasi = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }

        // Program management functions
        function addProgram() {
            const nama = document.getElementById('program-nama').value;
            const kategori = document.getElementById('program-kategori').value;
            const jadwal = document.getElementById('program-jadwal').value;
            const deskripsi = document.getElementById('program-deskripsi').value;
            
            if (!nama || !kategori || !jadwal) {
                alert('Nama program, kategori, dan jadwal harus diisi!');
                return;
            }
            
            const program = {
                id: Date.now(),
                nama: nama,
                kategori: kategori,
                jadwal: jadwal,
                deskripsi: deskripsi || ''
            };
            
            programData.push(program);
            updateProgramDisplay();
            updateProgramStatistics();
            
            // Clear form
            document.getElementById('program-nama').value = '';
            document.getElementById('program-kategori').value = '';
            document.getElementById('program-jadwal').value = '';
            document.getElementById('program-deskripsi').value = '';
        }

        function deleteProgram(id) {
            programData = programData.filter(program => program.id !== id);
            updateProgramDisplay();
            updateProgramStatistics();
        }

        function updateProgramDisplay() {
            const adminList = document.getElementById('admin-program-list');
            
            if (programData.length === 0) {
                adminList.innerHTML = '<p class="text-gray-500 italic">Belum ada program yang ditambahkan</p>';
                return;
            }
            
            // Group by category
            const programByCategory = programData.reduce((acc, program) => {
                if (!acc[program.kategori]) {
                    acc[program.kategori] = [];
                }
                acc[program.kategori].push(program);
                return acc;
            }, {});
            
            adminList.innerHTML = Object.keys(programByCategory).map(kategori => `
                <div class="bg-white rounded-lg p-4 border">
                    <h5 class="font-bold text-gray-800 mb-3 text-lg border-b pb-2">
                        <i class="fas fa-${getKategoriIcon(kategori)} text-orange-600 mr-2"></i>
                        ${kategori} (${programByCategory[kategori].length})
                    </h5>
                    <div class="space-y-2">
                        ${programByCategory[kategori].map(program => `
                            <div class="bg-gray-50 rounded-lg p-3 flex justify-between items-start">
                                <div class="flex-1">
                                    <div class="font-semibold text-gray-800">${program.nama}</div>
                                    <div class="text-sm text-gray-600 mb-1">
                                        <i class="fas fa-clock mr-1"></i>${program.jadwal}
                                    </div>
                                    ${program.deskripsi ? `<div class="text-sm text-gray-500">${program.deskripsi}</div>` : ''}
                                </div>
                                <button onclick="deleteProgram(${program.id})" class="text-red-600 hover:text-red-800 ml-3">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        function getKategoriIcon(kategori) {
            switch(kategori) {
                case 'Rutin': return 'calendar-check';
                case 'Pembiasaan Pagi': return 'sun';
                case 'Ekstrakurikuler': return 'star';
                case 'Khusus': return 'gem';
                default: return 'tasks';
            }
        }

        function updateProgramStatistics() {
            document.getElementById('stat-program').textContent = programData.length > 0 ? `${programData.length}+` : '-';
        }

        function generateProgramContent() {
            if (programData.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-tasks text-4xl mb-4"></i>
                        <p class="text-lg">Belum ada program sekolah</p>
                        <p class="text-sm">Program sekolah akan diisi oleh admin</p>
                    </div>
                `;
            }
            
            // Group by category
            const programByCategory = programData.reduce((acc, program) => {
                if (!acc[program.kategori]) {
                    acc[program.kategori] = [];
                }
                acc[program.kategori].push(program);
                return acc;
            }, {});
            
            const categories = Object.keys(programByCategory);
            
            return `
                <div class="mb-6 p-4 bg-orange-50 rounded-lg">
                    <h4 class="text-lg font-semibold text-orange-800 mb-2">Total Program Sekolah</h4>
                    <div class="grid md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div class="text-2xl font-bold text-orange-600">${programData.length}</div>
                            <div class="text-sm text-orange-600">Total Program</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-blue-600">${programByCategory['Rutin']?.length || 0}</div>
                            <div class="text-sm text-blue-600">Program Rutin</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-green-600">${programByCategory['Pembiasaan Pagi']?.length || 0}</div>
                            <div class="text-sm text-green-600">Pembiasaan Pagi</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-purple-600">${programByCategory['Ekstrakurikuler']?.length || 0}</div>
                            <div class="text-sm text-purple-600">Ekstrakurikuler</div>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-6">
                    ${categories.map(kategori => `
                        <div class="bg-white border rounded-lg p-6 shadow-sm">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-${getKategoriIcon(kategori)} text-orange-600 text-xl"></i>
                                </div>
                                <div>
                                    <h5 class="text-xl font-bold text-gray-800">${kategori}</h5>
                                    <p class="text-gray-600">${programByCategory[kategori].length} program tersedia</p>
                                </div>
                            </div>
                            
                            <div class="grid md:grid-cols-2 gap-4">
                                ${programByCategory[kategori].map((program, index) => `
                                    <div class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div class="flex items-start justify-between mb-3">
                                            <h6 class="font-bold text-gray-800 flex-1">${program.nama}</h6>
                                            <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold ml-2">
                                                ${kategori}
                                            </span>
                                        </div>
                                        <div class="flex items-center text-gray-600 text-sm mb-2">
                                            <i class="fas fa-clock mr-2"></i>
                                            <span>${program.jadwal}</span>
                                        </div>
                                        ${program.deskripsi ? `
                                            <p class="text-gray-600 text-sm leading-relaxed">${program.deskripsi}</p>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Student management functions
        function manageSiswa(kelasId) {
            // Only allow if logged in as admin
            if (!isLoggedIn) {
                alert('Anda harus login sebagai admin untuk mengakses fitur ini!');
                return;
            }
            
            const kelas = kelasData.find(k => k.id === kelasId);
            if (!kelas) {
                alert('Data kelas tidak ditemukan!');
                return;
            }
            
            const modal = document.getElementById('siswa-modal');
            const title = document.getElementById('siswa-modal-title');
            const content = document.getElementById('siswa-modal-content');
            
            if (!modal || !title || !content) {
                console.error('Modal elements not found');
                return;
            }
            
            title.textContent = `Kelola Siswa Kelas ${kelas.nama}`;
            
            content.innerHTML = `
                <div class="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="text-lg font-semibold text-blue-800">Kelas ${kelas.nama}</h4>
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            ${kelas.siswa.length}/${kelas.target} siswa
                        </span>
                    </div>
                    <p class="text-blue-600 text-sm">Wali Kelas: ${kelas.wali}</p>
                    <div class="mt-3">
                        <div class="w-full bg-blue-200 rounded-full h-3">
                            <div class="bg-blue-600 h-3 rounded-full transition-all duration-300" style="width: ${Math.min((kelas.siswa.length / kelas.target) * 100, 100)}%"></div>
                        </div>
                        <p class="text-xs text-blue-600 mt-1">${Math.round((kelas.siswa.length / kelas.target) * 100)}% kapasitas terisi</p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <h5 class="text-lg font-semibold text-gray-800 mb-3">Tambah Siswa Baru</h5>
                    <div class="flex gap-3">
                        <input type="text" id="siswa-nama-input-${kelasId}" placeholder="Nama lengkap siswa" class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <button onclick="addSiswa(${kelasId})" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-plus mr-2"></i>Tambah
                        </button>
                    </div>
                    ${kelas.siswa.length >= kelas.target ? `
                        <div class="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p class="text-yellow-800 text-sm">
                                <i class="fas fa-exclamation-triangle mr-2"></i>
                                Kelas sudah mencapai kapasitas maksimal (${kelas.target} siswa)
                            </p>
                        </div>
                    ` : ''}
                </div>
                
                <div>
                    <h5 class="text-lg font-semibold text-gray-800 mb-3">Daftar Siswa (${kelas.siswa.length})</h5>
                    <div id="siswa-list-${kelasId}" class="space-y-2 max-h-64 overflow-y-auto">
                        ${kelas.siswa.length === 0 ? `
                            <div class="text-center py-8 text-gray-500">
                                <i class="fas fa-user-plus text-3xl mb-3"></i>
                                <p>Belum ada siswa yang terdaftar</p>
                                <p class="text-sm">Tambahkan siswa menggunakan form di atas</p>
                            </div>
                        ` : kelas.siswa.map((siswa, index) => `
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                        ${index + 1}
                                    </div>
                                    <span class="font-medium text-gray-800">${siswa}</span>
                                </div>
                                <button onclick="deleteSiswa(${kelasId}, ${index})" class="text-red-600 hover:text-red-800 p-1" title="Hapus siswa">
                                    <i class="fas fa-trash text-sm"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Show modal with proper z-index
            modal.classList.remove('hidden');
            modal.style.zIndex = '200';
        }

        function closeSiswaModal() {
            const modal = document.getElementById('siswa-modal');
            modal.classList.add('hidden');
        }

        function addSiswa(kelasId) {
            if (!isLoggedIn) {
                alert('Anda harus login sebagai admin untuk mengakses fitur ini!');
                return;
            }
            
            const kelas = kelasData.find(k => k.id === kelasId);
            if (!kelas) {
                alert('Data kelas tidak ditemukan!');
                return;
            }
            
            const namaInput = document.getElementById(`siswa-nama-input-${kelasId}`);
            if (!namaInput) {
                alert('Input nama siswa tidak ditemukan!');
                return;
            }
            
            const nama = namaInput.value.trim();
            
            if (!nama) {
                alert('Nama siswa harus diisi!');
                namaInput.focus();
                return;
            }
            
            // Check if student name already exists in this class
            if (kelas.siswa.includes(nama)) {
                alert('Nama siswa sudah ada di kelas ini!');
                namaInput.focus();
                namaInput.select();
                return;
            }
            
            // Check capacity
            if (kelas.siswa.length >= kelas.target) {
                alert('Kelas sudah mencapai kapasitas maksimal!');
                return;
            }
            
            // Add student
            kelas.siswa.push(nama);
            namaInput.value = '';
            
            // Update displays
            updateKelasDisplay();
            manageSiswa(kelasId); // Refresh modal
            
            // Show success message
            alert(`Siswa "${nama}" berhasil ditambahkan ke kelas ${kelas.nama}!`);
        }

        function deleteSiswa(kelasId, siswaIndex) {
            if (!isLoggedIn) {
                alert('Anda harus login sebagai admin untuk mengakses fitur ini!');
                return;
            }
            
            const kelas = kelasData.find(k => k.id === kelasId);
            if (!kelas) {
                alert('Data kelas tidak ditemukan!');
                return;
            }
            
            if (siswaIndex < 0 || siswaIndex >= kelas.siswa.length) {
                alert('Data siswa tidak valid!');
                return;
            }
            
            const namaSiswa = kelas.siswa[siswaIndex];
            
            if (confirm(`Apakah Anda yakin ingin menghapus siswa "${namaSiswa}" dari kelas ${kelas.nama}?`)) {
                kelas.siswa.splice(siswaIndex, 1);
                
                // Update displays
                updateKelasDisplay();
                manageSiswa(kelasId); // Refresh modal
                
                alert(`Siswa "${namaSiswa}" berhasil dihapus dari kelas ${kelas.nama}!`);
            }
        }
    

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'96a2e40956da40d8',t:'MTc1NDM2MTIxNy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();