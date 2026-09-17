import React from 'react'
 

const Videofooter = () => {
  return (
    <div className='bg-[#f6f6f6] h-[70vh]'>
        {/* Marquee */}
            <div className="w-full   py-3 overflow-hidden   ">
              <div className="flex whitespace-nowrap animate-marquee font-bold text-[#063c1d]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="font-akira   text-2xl md:text-4xl mx-6 flex items-center gap-6"
                  >
                    KR$NA{" "}
                    <span className=""></span> BOOK NOW{" "}
                    <span className=" "></span>
                  </span>
                ))}
              </div>
            </div>
    

    <div className="text bg-red-9">
      <div className=""></div>
       <section className="w-full overflow-hidden   px-[18px] py-[42px] sm:px-6 sm:py-[54px] md:px-[3.2vw] md:py-[76px]">
      <div className="mx-auto w-full max-w-[1940px]">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d9ded9] bg-white/30 px-[15px] py-2.5 font-sans text-[14px] font-medium leading-none tracking-[-0.02em] text-[#53675b] shadow-sm sm:text-[16px]">
          <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#d1f551] sm:h-[9px] sm:w-[9px]" />
          <span>Cultiva Legacy</span>
        </div>
        

        {/* Main Text */}
        <h2
          className="
            !mt-[27px]
            max-w-full
            font-sans
            text-[32px]
            font-normal
            leading-[1.03]
            tracking-[-0.052em]
            sm:!mt-[20px]
            sm:text-[clamp(38px,7.1vw,64px)]
            sm:leading-[1.02]
            md:!mt-[30px]
            md:text-[clamp(42px,4.15vw,78px)]
            md:leading-[0.99]
          "
        >
          <span className="text-[#063c1d] ">
            Our platform is built to support farmers, agribusinesses, and
            agricultural innovators
          </span>{" "}
          
          <span className="text-[#718277]">
            by delivering{" "}
            
            {/* Inline Image */}
            <img
              src="/images/videofooterimg.png"
              alt=""
              aria-hidden="true"
              className="
                inline-block
                h-[37px]
                w-[76px]
                rounded-full
                opacity-80
                border-[#d1f551] border-1
                object-cover
                align-[-0.07em]
                sm:h-[clamp(37px,6.3vw,56px)]
                sm:w-[clamp(76px,13vw,116px)]
                md:h-[clamp(39px,3vw,72px)]
                md:w-[clamp(82px,7.8vw,156px)]
              "
            />{" "}
            
            practical tools that respect the land while improving productivity.
          </span>
        </h2>
      </div>
    </section>
    </div>


    </div>
  )
}

export default Videofooter