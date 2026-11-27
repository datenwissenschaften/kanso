import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const json = (path) => JSON.parse(read(path));
const expectFile = (path) => assert.ok(statSync(new URL(path, root)).isFile());
const pkg = json("package.json");

test("host manifests match the package version and canonical skill", () => {
  assert.equal(pkg.name, "kanso-skill");
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
  assert.ok(pkg.files.includes("skills/kanso/"));
  assert.match(read("skills/kanso/SKILL.md"), /^---\r?\nname: kanso\r?\n/);
  for (const path of [
    ".claude-plugin/plugin.json",
    ".codex-plugin/plugin.json",
    ".github/plugin/plugin.json",
  ]) {
    const plugin = json(path);
    assert.equal(plugin.name, "kanso", path);
    assert.equal(plugin.version, pkg.version, path);
    assert.equal((plugin.skills ?? "skills/").replace(/^\.\//, ""), "skills/");
  }
});

test("each marketplace resolves its plugin at the repository root", () => {
  for (const path of [
    ".agents/plugins/marketplace.json",
    ".claude-plugin/marketplace.json",
    ".github/plugin/marketplace.json",
  ]) {
    const marketplace = json(path);
    assert.equal(marketplace.name, "kanso", path);
    assert.equal(marketplace.plugins.length, 1, path);
    const [plugin] = marketplace.plugins;
    assert.equal(plugin.name, "kanso", path);
    assert.equal(plugin.source.path ?? plugin.source, "./", path);
  }
});

test("the Codex plugin ships its prompt hook and artwork", () => {
  const plugin = json(".codex-plugin/plugin.json");
  const hook = json(plugin.hooks).hooks.UserPromptSubmit[0].hooks[0];
  assert.equal(hook.type, "command");
  assert.match(hook.command, /^echo Use the kanso skill for this prompt\./);
  expectFile(plugin.interface.composerIcon);
  expectFile(plugin.interface.logo);
});
