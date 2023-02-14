import { test, expect } from "@playwright/test";

/**
 * 正常系のテストです。
 */
test("normal case", async ({ page }) => {
  // --- Fintan SpringSampleProject ログインページへ遷移
  await page.goto("http://localhost:8080/login");

  // --- ログイン
  await page.getByPlaceholder("ログインID").click();
  await page.getByPlaceholder("ログインID").fill("10000001");
  await page.getByPlaceholder("ログインID").press("Tab");
  await page.getByPlaceholder("パスワード").fill("pass123-");
  await page.getByRole("button", { name: "ログイン" }).click();
  await page.getByRole("link", { name: "プロジェクト登録" }).click();

  // --- 顧客選択 （業種で絞り込んで「テスト会社３（建設業）」を選択する例）
  await page.getByRole("button", { name: "選択" }).click();
  // 業種を選択 01:農業, 02:建設業, 03:製造業
  await page.getByRole("combobox", { name: "業種" }).selectOption("02");
  await page.getByRole("button", { name: "検索" }).click();
  await page.locator("#clientList").selectOption("5"); // <option value="5">テスト会社３（建設業）</option>
  await page
    .getByRole("dialog", { name: "顧客情報を検索" })
    .getByRole("button", { name: "選択" })
    .click();

  // --- その他の項目を入力
  await page.getByRole("combobox", { name: "事業部/部門*" }).selectOption("1");
  await page.locator("#organizationId").selectOption("3");
  await page.getByPlaceholder("PJ名").fill("自動化テスト１");
  await page.getByRole("combobox", { name: "PJ種別*" }).selectOption("09");
  await page.getByLabel("Ｄ").check();
  await page.getByPlaceholder("売上高").fill("3");
  await page.getByPlaceholder("PM").fill("自動化テストマネージャー");
  await page.getByPlaceholder("PL").fill("自動化テストリーダー");
  await page.getByPlaceholder("開始日").fill("2023-02-20");
  await page.getByPlaceholder("終了日").fill("2023-02-28");
  await page.getByLabel("備考").fill("playwright");
  await page.getByRole("button", { name: "確認" }).click();

  // --- 検証
  // PJ名が自動化テスト１となっていることを検証する
  await expect(
    page.locator("xpath=/html/body/div[2]/div/div[2]/form/div[2]/span[2]")
  ).toContainText("自動化テスト１");

  // --- スクリーンショット取得
  await page.screenshot({
    path: "test-results/screenshot/normal.png",
    fullPage: true,
  });

  // --- 確認画面で登録ボタンをクリック
  // DBに反映したい場合には、コメントアウトしてください。↓↓↓
  //await page.getByRole('button', { name: '登録' }).click();
});

/**
 * ログイン失敗のテストです。
 */
test("login erro", async ({ page }) => {
  await page.goto("http://localhost:8080/login");
  await page.getByPlaceholder("ログインID").click();
  await page.getByPlaceholder("ログインID").fill("1000001");
  await page.getByPlaceholder("ログインID").press("Tab");
  await page.getByPlaceholder("パスワード").fill("password");
  await page.getByRole("button", { name: "ログイン" }).click();

  // --- 検証
  // エラーメッセージが表示されていることを検証する
  await expect(
    page.getByText("ユーザ名かパスワードが正しくありません")
  ).toBeVisible();

  // --- スクリーンショット取得
  await page.screenshot({
    path: "test-results/screenshot/login-error.png",
    fullPage: true,
  });
});

/**
 * プロジェクト登録失敗のテスト(必須項目未入力)。
 */
test("validation error", async ({ page }) => {
  await page.goto("http://localhost:8080/login");
  await page.getByPlaceholder("ログインID").click();
  await page.getByPlaceholder("ログインID").fill("10000001");
  await page.getByPlaceholder("ログインID").press("Tab");
  await page.getByPlaceholder("パスワード").fill("pass123-");
  await page.getByPlaceholder("パスワード").press("Enter");
  await page.getByRole("link", { name: "プロジェクト登録" }).click();
  await page.getByRole("combobox", { name: "事業部/部門*" }).selectOption("1");
  await page.getByRole("button", { name: "確認" }).click();

  // --- 検証
  await expect(
    page
      .locator("div")
      .filter({ hasText: "PJ名* 入力してください。" })
      .locator("span")
      .nth(1)
  ).toBeVisible();

  // --- スクリーンショット取得
  await page.screenshot({
    path: "test-results/screenshot/validation-error.png",
    fullPage: true,
  });
});
