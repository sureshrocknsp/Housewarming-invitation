import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import { Sparkles, Flame, HeartHandshake, Sun } from 'lucide-react';

export default function RitualsGuide() {
  const traditions = [
    {
      title: "Paalu Ponginchadam (Milk Boiling)",
      teluguTitle: "పాలు పొంగించే శుభ కార్యం",
      description:
        "The very first fire lit in the new kitchen boils fresh milk in a new auspicious brass vessel until it gently spills over on all four sides. It symbolizes prosperity, harmony, joy, and eternal abundance flowing into every corner of the home.",
      icon: Flame,
      tag: "Signature Telugu Ritual"
    },
    {
      title: "Dwara & Gadapa Pooja",
      teluguTitle: "ద్వార & గడప పూజ",
      description:
        "The main threshold (Gadapa) of the house is smeared with auspicious yellow turmeric and vermillion kumkuma, crowned with mango leaves and marigold garlands to invite Goddess Lakshmi.",
      icon: Sparkles,
      tag: "Threshold Blessing"
    },
    {
      title: "Go Pooja (Kamadhenu Pravesam)",
      teluguTitle: "గోమాత ప్రవేశం & గోపూజ",
      description:
        "Welcoming the sacred cow and calf into the home prior to the family's entry. According to Sanatana Dharma, all 33 crore deities reside within Gomatha, dispelling negative energies and infusing divine vibrations.",
      icon: Sun,
      tag: "Vedic Sanctification"
    },
    {
      title: "Satyanarayana Swamy Vratham",
      teluguTitle: "శ్రీ సత్యనారాయణ స్వామి వ్రతం",
      description:
        "The sacred prayer and gratitude story recitation of Lord Satyanarayana Swamy, ensuring peace, prosperity, health, and familial harmony in the new abode.",
      icon: HeartHandshake,
      tag: "Devotional Vratham"
    }
  ];

  return (
    <section className="relative py-14 sm:py-20 px-3 sm:px-6 bg-cream bg-muggu-pattern border-t border-b border-turmeric/30">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={Sparkles}
          badgeText="Telugu Gruhapravesam Traditions"
          teluguHeading="మన సాంప్రదాయ విశేషాలు"
          englishSubtitle="Significance of Auspicious Housewarming Rituals"
        />

        {/* Feature Split: Milk Boiling Showcase + Traditions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Milk Boiling Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-turmeric shadow-royal group">
              <img
                src="/images/milk-boiling.jpg"
                alt="Traditional Telugu Gruhapravesam Paalu Pongadam Milk Boiling Ceremony"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/95 via-maroon-deep/40 to-transparent flex flex-col justify-end p-6 text-cream">
                <span className="text-[11px] font-cinzel uppercase tracking-widest text-turmeric font-bold">
                  క్షీర భాగ్య సేవనం
                </span>
                <h3 className="text-xl font-telugu font-bold text-cream-light mb-1">
                  పాలు పొంగించడం (Paalu Pongadam)
                </h3>
                <p className="text-xs font-poppins text-cream/90 leading-relaxed">
                  "As the boiling milk overflows towards the east and north, may auspicious joy and prosperity overflow perpetually in our home."
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-turmeric/20 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Right Column: Key Rituals Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traditions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-cream-light/95 border border-turmeric/50 rounded-2xl p-5 shadow-sm hover:shadow-traditional hover:border-turmeric transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-turmeric/20 text-maroon">
                        <Icon className="w-5 h-5 text-turmeric-dark" />
                      </div>
                      <span className="text-[9px] font-cinzel uppercase px-2 py-0.5 rounded-full bg-turmeric/15 text-maroon font-semibold border border-turmeric/30">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold font-poppins text-maroon leading-snug mb-1">
                      {item.title}
                    </h4>
                    <div className="text-xs font-telugu text-turmeric-dark font-semibold mb-2">
                      {item.teluguTitle}
                    </div>

                    <p className="text-xs font-poppins text-maroon-dark/85 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
