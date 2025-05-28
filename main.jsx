
import React, { useState, useEffect } from 'react';

const rewards = [
  { name: "🚗 سيارة", cost: 300 },
  { name: "🏠 بيت", cost: 600 },
  { name: "👗 ملابس", cost: 150 }
];

const GroupStudyApp = () => {
  const [studyTime, setStudyTime] = useState(0); // بالدقائق
  const [restTime, setRestTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [coins, setCoins] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [bioLevel, setBioLevel] = useState(1);

  useEffect(() => {
    let timer;
    if (isStudying) {
      timer = setInterval(() => {
        setStudyTime(prev => prev + 1);
        setCoins(prev => prev + 1); // كل دقيقة دراسة = 1 عملة
      }, 60000);
    } else {
      timer = setInterval(() => {
        setRestTime(prev => prev + 1);
      }, 60000);
    }
    return () => clearInterval(timer);
  }, [isStudying]);

  useEffect(() => {
    // تحديث مستوى البايو بناءً على ساعات الدراسة
    const level = Math.floor(studyTime / 60) + 1;
    setBioLevel(level);
  }, [studyTime]);

  const buyReward = (reward) => {
    if (coins >= reward.cost) {
      setCoins(coins - reward.cost);
      setInventory([...inventory, reward.name]);
    } else {
      alert("ما عندك نقود كافية للشراء!");
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>تطبيق الدراسة الجماعية</h2>
      <div>
        <strong>البيو:</strong> مستوى {bioLevel} | ساعات دراسة: {(studyTime / 60).toFixed(2)} ساعات
      </div>
      <div>
        <strong>النقود:</strong> {coins}
      </div>
      <button onClick={() => setIsStudying(!isStudying)}>
        {isStudying ? "توقف عن الدراسة" : "ابدأ الدراسة"}
      </button>
      <div style={{ marginTop: 20 }}>
        <h3>المكافآت</h3>
        {rewards.map(reward => (
          <div key={reward.name} style={{ marginBottom: 10 }}>
            <button onClick={() => buyReward(reward)}>اشتري {reward.name} - {reward.cost} عملة</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <h3>مشترياتك:</h3>
        <div>{inventory.join(", ") || "لا توجد مشتريات بعد"}</div>
      </div>
      <div style={{ marginTop: 20 }}>
        <strong>وقت الراحة:</strong> {(restTime / 60).toFixed(2)} ساعات
      </div>
    </div>
  );
};

export default GroupStudyApp;
