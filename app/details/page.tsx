const representatives = [
  {
    name: "ШЕВЧУК КАРИНА АРМАИСОВНА, 48 лет",
    support: "Бессрочно",
    birthDate: "08.02.1978",
  },
  {
    name: "ШЕВЧУК СЕРГЕЙ АЛЕКСЕЕВИЧ, 46 лет",
    support: "Бессрочно",
    birthDate: "05.10.1979",
  },
];

const children = [
  {
    name: "ШЕВЧУК СОФЬЯ СЕРГЕЕВНА, 21 год",
    support: "до 30.06.2026",
    birthDate: "19.10.2004",
  },
  {
    name: "ШЕВЧУК МАРГАРИТА СЕРГЕЕВНА, 19 лет",
    support: "до 30.06.2026",
    birthDate: "13.07.2006",
  },
  {
    name: "ШЕВЧУК РОМАН СЕРГЕЕВИЧ, 12 лет",
    support: "до 30.06.2026",
    birthDate: "17.02.2014",
  },
];

const PersonBlock = ({
  name,
  support,
  birthDate,
}: {
  name: string;
  support: string;
  birthDate: string;
}) => (
  <section className="pt-[18px]">
    <h3 className="text-[14px] font-bold leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
      {name}
    </h3>

    <div className="mt-[22px]">
      <p className="text-[14px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
        Социальная поддержка действует
      </p>
      <p className="mt-[10px] text-[14px] font-normal leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
        {support}
      </p>
    </div>

    <div className="mt-[22px]">
      <p className="text-[14px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
        Дата рождения
      </p>
      <p className="mt-[10px] text-[14px] font-normal leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
        {birthDate}
      </p>
    </div>
  </section>
);

export default function DetailsPage() {
  return (
    <main className="w-full flex-1 bg-black px-[4px] pb-[8px] pt-[22px] font-sans">
      <article className="mx-auto w-full max-w-[379px] rounded-b-[14px] rounded-t-[13px] bg-[#292A33] px-[22px] pb-[20px] pt-[27px] text-left">
        <section>
          <h2 className="text-[16px] font-bold leading-[23px] tracking-[-0.02em] text-[#E7E9EF]">
            104000003205937
          </h2>

          <div className="mt-[24px] h-px w-full bg-[#555866]" />

          <div className="mt-[25px]">
            <p className="text-[16px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
              Статус многодетной семьи
            </p>
            <p className="mt-[10px] text-[16px] font-normal leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
              Установлен
            </p>
          </div>

          <div className="mt-[23px]">
            <p className="text-[16px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
              Дата установления статуса
            </p>
            <p className="mt-[10px] text-[16px] font-normal leading-[21px] tracking-[-0.02em] text-[#EFF0F4]">
              29.05.2024
            </p>
          </div>

          <div className="mt-[23px]">
            <p className="text-[16px] font-normal leading-[21px] tracking-[-0.02em] text-[#828898]">
              Орган, установивший статус
            </p>
            <p className="mt-[10px] max-w-[300px] text-[16px] font-normal leading-[22px] tracking-[-0.02em] text-[#EFF0F4]">
              Администрация Фрунзенского района Санкт-Петербурга
            </p>
          </div>

          <div className="mt-[24px] h-px w-full bg-[#555866]" />
        </section>

        <section className="pt-[25px]">
          <h2 className="text-[16px] font-bold leading-[23px] tracking-[-0.02em] text-[#F0F1F4]">
            Законные представители
          </h2>

          <div className="mt-[18px] space-y-[16px]">
            {representatives.map((person) => (
              <PersonBlock key={person.name} {...person} />
            ))}
          </div>
        </section>

        <div className="mt-[25px] h-px w-full bg-[#555866]" />

        <section className="pt-[25px]">
          <h2 className="text-[16px] font-bold leading-[23px] tracking-[-0.02em] text-[#F0F1F4]">
            Дети
          </h2>

          <div className="mt-[18px] space-y-[16px]">
            {children.map((person) => (
              <PersonBlock key={person.name} {...person} />
            ))}
          </div>
        </section>

        <button
          type="button"
          className="mt-[28px] flex h-[58px] w-full items-center justify-center rounded-[12px] bg-[#168BF2] text-[17px] font-normal leading-[22px] tracking-[-0.02em] text-white"
        >
          Поделиться
        </button>
      </article>
    </main>
  );
}
