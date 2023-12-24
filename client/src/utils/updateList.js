export default function updateList(list, value) {
  return list.filter((el) =>
    el.name.toLowerCase().includes(value.toLowerCase()),
  );
}
