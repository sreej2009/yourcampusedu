import {
  PhoneCall,
  MessageCircle,
  PlaneTakeoff,
  Activity,
} from "lucide-react";

const MbbsCTA = () => {
  return (
    <section className="mbbs-cta">
      <div className="mbbs-cta__card">
        {/* Left */}
        <div className="mbbs-cta__left">
          <div className="mbbs-cta__tags">
            <span className="mbbs-cta__tag">
              <PlaneTakeoff size={14} />
              Free Counselling
            </span>

            <span className="mbbs-cta__live">
              <span className="mbbs-cta__live-dot" />
              Counsellors online
            </span>
          </div>

          <h2 className="mbbs-cta__title">
            Not sure which country is right for you?
          </h2>

          <p className="mbbs-cta__subtitle">
            Get a free NEET-score based recommendation from a counsellor — no
            obligation, no pressure.
          </p>
        </div>

        {/* Divider */}
        <div className="mbbs-cta__divider" aria-hidden="true">
          <span className="mbbs-cta__rail" />
          <span className="mbbs-cta__pulse">
            <Activity size={15} />
          </span>
        </div>

        {/* Right */}
        <div className="mbbs-cta__right">
          <a
            href="tel:+911234567890"
            className="mbbs-cta__btn mbbs-cta__btn--primary"
          >
            <PhoneCall size={18} />
            <span>
              Call Now
              <em>+91 86808 88184</em>
              <em>+91 86808 88185</em>
            </span>
          </a>

          <a
            href="https://wa.me/8680888184"
            target="_blank"
            rel="noreferrer"
            className="mbbs-cta__btn mbbs-cta__btn--ghost"
          >
            <MessageCircle size={18} />
            <span>
              Chat on WhatsApp
              <em>Usually replies in minutes</em>
            </span>
          </a>
        </div>
      </div>

      <style>{`
        /* ================================
           MBBS CTA SECTION
        ================================= */

        .mbbs-cta {
          width: 100%;
          background: var(--bg-main);

          /* ⭐ This is the fix */
          padding: clamp(4rem, 7vw, 6rem) 1.5rem
            clamp(3.5rem, 7vw, 5.5rem);

          display: flex;
          justify-content: center;
          box-sizing: border-box;
        }

        .mbbs-cta__card {
          position: relative;
          width: 100%;
          max-width: 800px;
          display: grid;
          grid-template-columns: 1.2fr auto 1fr;
          align-items: center;
          gap: clamp(1.5rem, 3vw, 2.25rem);
          padding: clamp(1.85rem, 4vw, 2.6rem)
            clamp(1.85rem, 4vw, 2.85rem);
          border-radius: var(--radius-xl);
          background: var(--gradient-secondary);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          isolation: isolate;
        }

        .mbbs-cta__card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(circle at 8% 15%,
              color-mix(in srgb, var(--accent-green) 30%, transparent),
              transparent 55%),
            radial-gradient(circle at 96% 90%,
              color-mix(in srgb, var(--extra-purple) 30%, transparent),
              transparent 50%);
        }

        .mbbs-cta__left {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .mbbs-cta__tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.6rem;
        }

        .mbbs-cta__tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          width: fit-content;
          padding: 0.32rem 0.75rem;
          border-radius: var(--radius-lg);
          background: color-mix(in srgb, var(--text-white) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--text-white) 22%, transparent);
          color: var(--text-white);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .mbbs-cta__live {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: color-mix(in srgb, var(--text-white) 88%, transparent);
        }

        .mbbs-cta__live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-green);
          box-shadow: 0 0 0 3px
            color-mix(in srgb, var(--accent-green) 30%, transparent);
          animation: mbbs-cta-blink 1.8s ease-in-out infinite;
        }

        @keyframes mbbs-cta-blink {
          0%,100% {
            box-shadow: 0 0 0 3px
              color-mix(in srgb, var(--accent-green) 30%, transparent);
          }
          50% {
            box-shadow: 0 0 0 6px
              color-mix(in srgb, var(--accent-green) 14%, transparent);
          }
        }

        .mbbs-cta__title {
          font-size: clamp(1.45rem,2.6vw,1.85rem);
          font-weight:700;
          line-height:1.32;
          color:var(--text-white);
          margin:.15rem 0 0;
        }

        .mbbs-cta__subtitle{
          font-size:.98rem;
          line-height:1.6;
          color:color-mix(in srgb,var(--text-white)84%,transparent);
          margin:0;
          max-width:340px;
        }

        .mbbs-cta__divider{
          position:relative;
          width:1px;
          height:100%;
          min-height:110px;
          display:flex;
          justify-content:center;
          align-items:center;
        }

        .mbbs-cta__rail{
          position:absolute;
          inset:0;
          border-left:1.5px dashed
            color-mix(in srgb,var(--text-white)32%,transparent);
        }

        .mbbs-cta__pulse{
          position:relative;
          z-index:1;
          width:34px;
          height:34px;
          border-radius:50%;
          display:flex;
          justify-content:center;
          align-items:center;
          background:var(--bg-main);
          border:1.5px solid var(--accent-green);
          color:var(--accent-green);
          box-shadow:0 0 0 4px
            color-mix(in srgb,var(--accent-green)20%,transparent);
        }

        .mbbs-cta__right{
          display:flex;
          flex-direction:column;
          gap:.8rem;
        }

        .mbbs-cta__btn{
          display:inline-flex;
          align-items:center;
          gap:.75rem;
          padding:.8rem 1.2rem;
          border-radius:var(--radius-md);
          text-decoration:none;
          transition:var(--transition);
        }

        .mbbs-cta__btn span{
          display:flex;
          flex-direction:column;
          line-height:1.3;
        }

        .mbbs-cta__btn span em{
          font-style:normal;
          font-size:.76rem;
          opacity:.8;
        }

        .mbbs-cta__btn--primary{
          background:var(--gradient-primary);
          color:var(--text-white);
          font-weight:700;
        }

        .mbbs-cta__btn--primary:hover{
          transform:translateY(-2px);
        }

        .mbbs-cta__btn--ghost{
          background:color-mix(in srgb,var(--text-white)10%,transparent);
          border:1px solid color-mix(in srgb,var(--text-white)26%,transparent);
          color:var(--text-white);
          font-weight:700;
        }

        .mbbs-cta__btn--ghost:hover{
          background:color-mix(in srgb,var(--text-white)18%,transparent);
        }

        @media (max-width:680px){
          .mbbs-cta{
            padding-top:3.5rem;
          }

          .mbbs-cta__card{
            grid-template-columns:1fr;
            text-align:center;
          }

          .mbbs-cta__left{
            align-items:center;
          }

          .mbbs-cta__tags{
            justify-content:center;
          }

          .mbbs-cta__subtitle{
            max-width:100%;
          }

          .mbbs-cta__divider{
            width:100%;
            height:1px;
            min-height:0;
          }

          .mbbs-cta__rail{
            border-left:none;
            border-top:1.5px dashed
              color-mix(in srgb,var(--text-white)32%,transparent);
          }

          .mbbs-cta__btn{
            justify-content:center;
          }
        }
      `}</style>
    </section>
  );
};

export default MbbsCTA; 