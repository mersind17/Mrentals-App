
import React from 'react';

interface SEOSectionProps {
  t: (key: string) => string;
}

const SEOSection: React.FC<SEOSectionProps> = ({ t }) => {
  return (
    <section className="bg-[#141f1b] py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main H2 - SEO Optimized */}
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 tracking-tighter leading-tight">
            {t('seo_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                  {t('seo_intro')}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#acc8a2] mb-4 uppercase tracking-tight">
                  {t('seo_elbasan_title')}
                </h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {t('seo_elbasan_body')}
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-black text-[#acc8a2] mb-4 uppercase tracking-tight">
                  {t('seo_tirana_title')}
                </h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {t('seo_tirana_body')}
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-black text-[#acc8a2] mb-4 uppercase tracking-tight">
                  {t('seo_fleet_title')}
                </h4>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {t('seo_fleet_body')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 bg-white/5 rounded-[32px] border border-white/5 text-center">
            <p className="text-xl md:text-2xl font-bold text-white mb-0 italic">
              "{t('seo_cta')}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOSection;
