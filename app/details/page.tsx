import {
  familyDocument,
  familyMembers,
  formatPersonWithAge,
  uiText,
} from "@/lib/app-data";

type Person = (typeof familyMembers.representatives)[number];

const PersonBlock = ({
  person,
}: {
  person: Person | (typeof familyMembers.children)[number];
}) => (
  <section className="pt-[16px]">
    <h3 className="text-[15px] font-bold leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
      {formatPersonWithAge(person)}
    </h3>

    <div className="mt-[19px]">
      <p className="text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
        {uiText.socialSupportActive}
      </p>
      <p className="mt-[8px] text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
        {person.support}
      </p>
    </div>

    <div className="mt-[19px]">
      <p className="text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
        {uiText.birthDate}
      </p>
      <p className="mt-[8px] text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
        {person.birthDate}
      </p>
    </div>
  </section>
);

export default function DetailsPage() {
  return (
    <main className="w-full flex-1 bg-black px-[4px] pb-[8px] pt-[20px] font-sans">
      <article className="mx-auto w-full max-w-[379px] rounded-b-[14px] rounded-t-[13px] bg-[#292A33] px-[22px] pb-[18px] pt-[24px] text-left">
        <section>
          <h2 className="text-[16px] font-bold leading-[18px] tracking-[-0.02em] text-[#E7E9EF]">
            {familyDocument.number}
          </h2>

          <div className="mt-[21px] h-px w-full bg-[#555866]" />

          <div className="mt-[22px]">
            <p className="text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
              {familyDocument.statusLabel}
            </p>
            <p className="mt-[8px] text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
              {familyDocument.status}
            </p>
          </div>

          <div className="mt-[20px]">
            <p className="text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
              {familyDocument.establishedDateLabel}
            </p>
            <p className="mt-[8px] text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
              {familyDocument.establishedDate}
            </p>
          </div>

          <div className="mt-[20px]">
            <p className="text-[15px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
              {familyDocument.authorityLabel}
            </p>
            <p className="mt-[8px] max-w-[300px] text-[15px] font-normal leading-[22px] tracking-[-0.02em] text-[#EFF0F4]">
              {familyDocument.authority}
            </p>
          </div>

          <div className="mt-[21px] h-px w-full bg-[#555866]" />
        </section>

        <section className="pt-[22px]">
          <h2 className="text-[16px] font-bold leading-[23px] tracking-[-0.02em] text-[#F0F1F4]">
            {uiText.legalRepresentatives}
          </h2>

          <div className="mt-[15px] space-y-[12px]">
            {familyMembers.representatives.map((person) => (
              <PersonBlock key={person.name} person={person} />
            ))}
          </div>
        </section>

        <div className="mt-[22px] h-px w-full bg-[#555866]" />

        <section className="pt-[22px]">
          <h2 className="text-[16px] font-bold leading-[23px] tracking-[-0.02em] text-[#F0F1F4]">
            {uiText.children}
          </h2>

          <div className="mt-[15px] space-y-[12px]">
            {familyMembers.children.map((person) => (
              <PersonBlock key={person.name} person={person} />
            ))}
          </div>
        </section>

        <button
          type="button"
          className="mt-[25px] flex h-[58px] w-full items-center justify-center rounded-[12px] bg-[#168BF2] text-[17px] font-normal leading-[22px] tracking-[-0.02em] text-white"
        >
          {uiText.share}
        </button>
      </article>
    </main>
  );
}
