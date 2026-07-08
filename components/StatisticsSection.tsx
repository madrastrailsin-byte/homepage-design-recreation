'use client'

import { scene03Content } from '@/lib/scene03-data'
import Scene03CopyColumn from './scene-03/Scene03CopyColumn'
import Scene03HotelStage from './scene-03/Scene03HotelStage'

export default function StatisticsSection() {
  const { eyebrow, headline, headlineAccent, body, pillars, storyLinkLabel, hotels } = scene03Content

  return (
    <section className="mt-scroll-statistics mt-scene03-section w-full overflow-hidden bg-[#03191D]">
      <div className="mt-scene03-stage mx-auto w-full">
        <div className="mt-scene03-grid grid min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="mt-scene03-copy-column relative bg-[#03191D]">
            <Scene03CopyColumn
              eyebrow={eyebrow}
              headline={headline}
              headlineAccent={headlineAccent}
              body={body}
              pillars={pillars}
              storyLinkLabel={storyLinkLabel}
            />
          </div>

          <Scene03HotelStage
            content={{
              hotels,
            }}
          />
        </div>
      </div>
    </section>
  )
}
