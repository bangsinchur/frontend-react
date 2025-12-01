export default function getFormatDate(createdDate) {
  const year = createdDate.getFullYear();
  const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
  const day = createdDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
