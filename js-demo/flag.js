for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 5; j++) {
    if (i < 5 && j <= i) {
      process.stdout.write("*");
    } else if (i >= 5 && j <= i - 5) {
      process.stdout.write("*");
    } else {
      process.stdout.write(" ");
    }
  }
  console.log();
}
