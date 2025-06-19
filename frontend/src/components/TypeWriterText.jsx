import { Typewriter } from "react-simple-typewriter";


export default function TypewriterText() {
  return (
    <p className="text-xl font-semibold text-gray-600 mb-10 max-w-xl text-center min-h-[60px]">
      <Typewriter
        words={[
          "Instantly generate clean, professional resumes.",
          "Write impressive cover letters using AI.",
          "Land your dream job faster.",
        ]}
        loop={0} // 0 = infinite
        cursor
        cursorStyle="|"
        typeSpeed={50}
        deleteSpeed={30}
        delaySpeed={1600}
      />
    </p>
  );
}
