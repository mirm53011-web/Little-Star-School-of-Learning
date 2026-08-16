import React from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Bell,
  Calendar,
  Camera,
  FileText,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  Award,
  Users,
  CheckCircle2,
  Download,
  Star,
  Quote,
  Eye
} from 'lucide-react';
import {
  SchoolInfo,
  HeroSlide,
  AcademicLevel,
  AdmissionInfo,
  StudentResource,
  NoticeItem,
  SchoolEvent,
  GalleryItem
} from '../../types';
import { HeroCarousel } from '../public/HeroCarousel';

interface HomePageProps {
  schoolInfo: SchoolInfo;
  heroSlides: HeroSlide[];
  academics: AcademicLevel[];
  admissions: AdmissionInfo;
  resources: StudentResource[];
  notices: NoticeItem[];
  events: SchoolEvent[];
  gallery: GalleryItem[];
  onNavigate: (pageId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  schoolInfo,
  heroSlides,
  academics,
  admissions,
  resources,
  notices,
  events,
  gallery,
  onNavigate
}) => {
  // Extract top/urgent notices for quick spotlight
  const latestNotices = notices
    .filter(n => n.enabled)
    .slice(0, 3);

  // Extract quick featured student resources (syllabi, date sheets)
  const featuredResources = resources
    .filter(r => r.enabled)
    .slice(0, 4);

  // Extract upcoming events
  const upcomingEvents = events
    .filter(e => e.enabled && e.isUpcoming)
    .slice(0, 3);

  // Extract top gallery highlights
  const featuredGallery = gallery
    .filter(g => g.enabled)
    .slice(0, 4);

  return (
    <div className="w-full bg-slate-50">
      {/* 1. Hero Carousel Banner with Direct CTAs */}
      <HeroCarousel
        slides={heroSlides}
        onNavigate={onNavigate}
      />

      {/* 2. Key Pillars & Trust Highlights Bar */}
      <section className="bg-slate-900 text-white py-6 border-y border-slate-800 relative z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-2 md:pt-0 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <span className="text-lg font-extrabold text-white font-display">Est. 2012</span>
              <span className="text-xs text-slate-400 mt-0.5">Over a Decade of Excellence</span>
            </div>

            <div className="pt-2 md:pt-0 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white font-display">Nursery – 12th</span>
              <span className="text-xs text-slate-400 mt-0.5">Comprehensive Wings</span>
            </div>

            <div className="pt-2 md:pt-0 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white font-display">Batpora Campus</span>
              <span className="text-xs text-slate-400 mt-0.5">Safe & Nurturing Environment</span>
            </div>

            <div className="pt-2 md:pt-0 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white font-display">2026–2027</span>
              <span className="text-xs text-amber-300 font-semibold mt-0.5">Admissions Open</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Short School Introduction Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300/80 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Welcome to Little Star</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
                Inspiring Curiosity, Character & Academic Brilliance
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {schoolInfo.aboutText.slice(0, 300)}...
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-sm text-slate-900 font-semibold">Value-Based Education</strong>
                    <span className="text-xs text-slate-500">Character & moral leadership</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-sm text-slate-900 font-semibold">Individual Attention</strong>
                    <span className="text-xs text-slate-500">Optimal student-teacher ratio</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  id="home-about-learn-more"
                  onClick={() => onNavigate('about')}
                  className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="home-academics-btn"
                  onClick={() => onNavigate('academics')}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-6 py-3 rounded-xl text-sm border border-amber-300 transition-all flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>View Academic Wings</span>
                </button>
              </div>
            </div>

            {/* Right Card / Visual Preview */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Star className="w-6 h-6 fill-slate-950" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Little Star School</h3>
                    <p className="text-xs text-amber-300">Batpora, Jammu & Kashmir</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-300 border-t border-slate-700/80 pt-4">
                  <div className="flex items-center justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Head of Institution:</span>
                    <strong className="text-white font-semibold">{schoolInfo.principalName}</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">School Hours:</span>
                    <strong className="text-white">{schoolInfo.workingHours}</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Helpline:</span>
                    <a href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`} className="text-amber-400 hover:underline font-bold">
                      {schoolInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Admissions:</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                      Open Now
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/80">
                  <button
                    id="home-explore-admissions-cta"
                    onClick={() => onNavigate('admissions')}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3 rounded-xl text-center text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    <span>Explore Admissions 2026–27</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest Notices & Important Announcements Spotlight */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300/80 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Bell className="w-3.5 h-3.5 text-amber-700" />
                <span>Notice Board</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                Important & Latest Notices
              </h2>
            </div>

            <button
              id="home-view-all-notices-btn"
              onClick={() => onNavigate('notices')}
              className="inline-flex items-center space-x-2 text-sm font-bold text-amber-700 hover:text-amber-800 bg-white hover:bg-amber-50 px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNotices.length > 0 ? (
              latestNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => onNavigate('notices')}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        notice.isUrgent
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {notice.isUrgent ? '🔥 Urgent' : notice.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {notice.publishDate}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base font-display group-hover:text-amber-700 transition-colors line-clamp-2">
                      {notice.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {notice.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
                    <span>Read Circular</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-500">
                No active circulars at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Quick Student Resources Desk */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                <span>Student Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                Quick Student Resources & Downloads
              </h2>
            </div>

            <button
              id="home-view-all-resources-btn"
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center space-x-2 text-sm font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl border border-blue-200 transition-all"
            >
              <span>Explore All Student Resources</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResources.map((res) => (
              <div
                key={res.id}
                onClick={() => onNavigate('resources')}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-lg">
                      {res.classGrade}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {res.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-display mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span className="flex items-center space-x-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </span>
                  <span className="text-slate-400 font-normal">{res.fileSize || 'PDF'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming School Events */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>School Calendar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                Upcoming Events & Activities
              </h2>
            </div>

            <button
              id="home-view-all-events-btn"
              onClick={() => onNavigate('events')}
              className="inline-flex items-center space-x-2 text-sm font-bold text-amber-400 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 transition-all"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => onNavigate('events')}
                  className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 hover:border-amber-400/80 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full">
                        {ev.eventDate}
                      </span>
                      {ev.eventTime && (
                        <span className="text-xs text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{ev.eventTime}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                      {ev.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{ev.location || 'School Campus'}</span>
                    </span>
                    <span className="text-amber-400 font-semibold">Details →</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400">
                Check our Events page for the full semester calendar.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Short Principal's Message Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 sm:p-12 border border-amber-200/80 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-800 mb-4">
                  <img
                    src={schoolInfo.principalPhotoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                    alt={schoolInfo.principalName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {schoolInfo.principalName}
                </h3>
                <p className="text-xs text-amber-800 font-semibold uppercase">
                  Principal & Head of School
                </p>
              </div>

              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Quote className="w-3.5 h-3.5 text-amber-700" />
                  <span>Leadership Words</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                  A Message from Our Principal
                </h2>

                <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed font-serif">
                  "{schoolInfo.principalMessage.slice(0, 320)}..."
                </p>

                <div className="pt-3">
                  <button
                    id="home-principal-full-msg"
                    onClick={() => onNavigate('about')}
                    className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow transition-all inline-flex items-center space-x-2"
                  >
                    <span>Read Full Leadership Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Campus Gallery Spotlight */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-900 border border-purple-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Camera className="w-3.5 h-3.5 text-purple-700" />
                <span>Visual Tour</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                Campus & Student Life Gallery
              </h2>
            </div>

            <button
              id="home-view-all-gallery-btn"
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center space-x-2 text-sm font-bold text-purple-700 hover:text-purple-800 bg-white hover:bg-purple-50 px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('gallery')}
                className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-800 cursor-pointer shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-amber-400 text-[10px] font-bold uppercase">{item.category}</span>
                  <h4 className="text-white text-xs font-bold truncate">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Admission CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-slate-950 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Admissions Session 2026–2027</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-950">
            Shape Your Child’s Bright Future at Little Star
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-900 font-medium">
            Join a vibrant community committed to academic distinction, creative discovery, and disciplined personal growth.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              id="home-apply-now-btn"
              onClick={() => onNavigate('admissions')}
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-xl transition-all flex items-center space-x-2"
            >
              <span>Explore Admission Procedure</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <button
              id="home-contact-cta-btn"
              onClick={() => onNavigate('contact')}
              className="bg-white/90 hover:bg-white text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Admissions Helpline</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
