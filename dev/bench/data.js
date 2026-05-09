window.BENCHMARK_DATA = {
  "lastUpdate": 1778362442484,
  "repoUrl": "https://github.com/billdaws/bookmanager",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "f8fcb143be804d7345e2ffcec78aff67ef4dc070",
          "message": "ci(bench): track bench results over time",
          "timestamp": "2026-04-08T22:56:46-04:00",
          "tree_id": "26470aa30664214cdafe043cf72266f089145e9b",
          "url": "https://github.com/billdaws/bookmanager/commit/f8fcb143be804d7345e2ffcec78aff67ef4dc070"
        },
        "date": 1775703461383,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 225340,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 225340,
            "unit": "ns/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1655259,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1655259,
            "unit": "ns/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16811433,
            "unit": "ns/op\t 5900180 B/op\t   80036 allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16811433,
            "unit": "ns/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900180,
            "unit": "B/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3245641,
            "unit": "ns/op\t  142672 B/op\t    1261 allocs/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3245641,
            "unit": "ns/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 142672,
            "unit": "B/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31522037,
            "unit": "ns/op\t  711862 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31522037,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711862,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 300451486,
            "unit": "ns/op\t 6840878 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 300451486,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840878,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10804041,
            "unit": "ns/op\t 5900191 B/op\t   80036 allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10804041,
            "unit": "ns/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900191,
            "unit": "B/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.489,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.489,
            "unit": "ns/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1938010,
            "unit": "ns/op\t 1194940 B/op\t   30006 allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1938010,
            "unit": "ns/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194940,
            "unit": "B/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1468180,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1468180,
            "unit": "ns/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 532034,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 532034,
            "unit": "ns/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1536308,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1536308,
            "unit": "ns/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5623976,
            "unit": "ns/op\t 5224357 B/op\t   31899 allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5623976,
            "unit": "ns/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224357,
            "unit": "B/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31899,
            "unit": "allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 47158287,
            "unit": "ns/op\t47387419 B/op\t  316308 allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 47158287,
            "unit": "ns/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387419,
            "unit": "B/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316308,
            "unit": "allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 407662098,
            "unit": "ns/op\t577848709 B/op\t 3160407 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 407662098,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848709,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160407,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 264344101,
            "unit": "ns/op\t577839494 B/op\t 3160387 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 264344101,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577839494,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160387,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "4f473b59a91d8495c2bd99158915f7b1971ae496",
          "message": "fix(e2e): use shared connection for in-memory db",
          "timestamp": "2026-04-08T23:01:04-04:00",
          "tree_id": "8924b42492155a74028d3049299064bcd86eeb5f",
          "url": "https://github.com/billdaws/bookmanager/commit/4f473b59a91d8495c2bd99158915f7b1971ae496"
        },
        "date": 1775703721217,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 232640,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 232640,
            "unit": "ns/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1995099,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1995099,
            "unit": "ns/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 21156282,
            "unit": "ns/op\t 5900168 B/op\t   80036 allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 21156282,
            "unit": "ns/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900168,
            "unit": "B/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2565162,
            "unit": "ns/op\t  136330 B/op\t    1261 allocs/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2565162,
            "unit": "ns/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 136330,
            "unit": "B/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 30395598,
            "unit": "ns/op\t  711861 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 30395598,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711861,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 289836470,
            "unit": "ns/op\t 6840918 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 289836470,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840918,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 12485497,
            "unit": "ns/op\t 5900194 B/op\t   80036 allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 12485497,
            "unit": "ns/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900194,
            "unit": "B/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.178,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.178,
            "unit": "ns/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1870073,
            "unit": "ns/op\t 1194934 B/op\t   30006 allocs/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1870073,
            "unit": "ns/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194934,
            "unit": "B/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1378057,
            "unit": "ns/op\t 1043056 B/op\t   20008 allocs/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1378057,
            "unit": "ns/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043056,
            "unit": "B/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 747321,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 747321,
            "unit": "ns/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1475428,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1475428,
            "unit": "ns/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5737781,
            "unit": "ns/op\t 5224220 B/op\t   31899 allocs/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5737781,
            "unit": "ns/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224220,
            "unit": "B/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31899,
            "unit": "allocs/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 46453841,
            "unit": "ns/op\t47387840 B/op\t  316309 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 46453841,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387840,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316309,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 441110126,
            "unit": "ns/op\t577848458 B/op\t 3160406 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 441110126,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848458,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160406,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 293338712,
            "unit": "ns/op\t577833630 B/op\t 3160394 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 293338712,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577833630,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160394,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "3a05e168b93e817005466a4263c27dd3f3c7d5ee",
          "message": "fix: don't gitignore the entrypoint lol",
          "timestamp": "2026-04-08T23:06:43-04:00",
          "tree_id": "51610096653845685b20ee692a9533697c3a8ced",
          "url": "https://github.com/billdaws/bookmanager/commit/3a05e168b93e817005466a4263c27dd3f3c7d5ee"
        },
        "date": 1775704058670,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 242069,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "4221 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 242069,
            "unit": "ns/op",
            "extra": "4221 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "4221 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "4221 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2098105,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2098105,
            "unit": "ns/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 20830803,
            "unit": "ns/op\t 5900177 B/op\t   80036 allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 20830803,
            "unit": "ns/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900177,
            "unit": "B/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2521389,
            "unit": "ns/op\t  133078 B/op\t    1261 allocs/op",
            "extra": "469 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2521389,
            "unit": "ns/op",
            "extra": "469 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 133078,
            "unit": "B/op",
            "extra": "469 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "469 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 30222034,
            "unit": "ns/op\t  711868 B/op\t    5766 allocs/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 30222034,
            "unit": "ns/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711868,
            "unit": "B/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 289374842,
            "unit": "ns/op\t 6841082 B/op\t   50999 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 289374842,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6841082,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50999,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 12465901,
            "unit": "ns/op\t 5900194 B/op\t   80036 allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 12465901,
            "unit": "ns/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900194,
            "unit": "B/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.168,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "552647294 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.168,
            "unit": "ns/op",
            "extra": "552647294 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "552647294 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "552647294 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1985867,
            "unit": "ns/op\t 1194931 B/op\t   30006 allocs/op",
            "extra": "573 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1985867,
            "unit": "ns/op",
            "extra": "573 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194931,
            "unit": "B/op",
            "extra": "573 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "573 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1423230,
            "unit": "ns/op\t 1043057 B/op\t   20008 allocs/op",
            "extra": "847 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1423230,
            "unit": "ns/op",
            "extra": "847 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043057,
            "unit": "B/op",
            "extra": "847 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "847 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 640970,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1743 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 640970,
            "unit": "ns/op",
            "extra": "1743 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1743 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1743 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1542724,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "766 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1542724,
            "unit": "ns/op",
            "extra": "766 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "766 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "766 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6022767,
            "unit": "ns/op\t 5224612 B/op\t   31902 allocs/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6022767,
            "unit": "ns/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224612,
            "unit": "B/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31902,
            "unit": "allocs/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 47008247,
            "unit": "ns/op\t47390613 B/op\t  316309 allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 47008247,
            "unit": "ns/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47390613,
            "unit": "B/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316309,
            "unit": "allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 441503345,
            "unit": "ns/op\t577847650 B/op\t 3160405 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 441503345,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577847650,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160405,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 294233196,
            "unit": "ns/op\t577829512 B/op\t 3160393 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 294233196,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577829512,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160393,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "177293c8c82eda4fdb4e51d07b3bf61bbe8eeef0",
          "message": "docs: init README",
          "timestamp": "2026-04-08T23:10:54-04:00",
          "tree_id": "db928792084b8a616ef3b3c9c45b5884957ca707",
          "url": "https://github.com/billdaws/bookmanager/commit/177293c8c82eda4fdb4e51d07b3bf61bbe8eeef0"
        },
        "date": 1775704307867,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 216474,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 216474,
            "unit": "ns/op",
            "extra": "5523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1686751,
            "unit": "ns/op\t  412472 B/op\t    8028 allocs/op",
            "extra": "714 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1686751,
            "unit": "ns/op",
            "extra": "714 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412472,
            "unit": "B/op",
            "extra": "714 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "714 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16666221,
            "unit": "ns/op\t 5900185 B/op\t   80036 allocs/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16666221,
            "unit": "ns/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900185,
            "unit": "B/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3144967,
            "unit": "ns/op\t  142052 B/op\t    1261 allocs/op",
            "extra": "375 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3144967,
            "unit": "ns/op",
            "extra": "375 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 142052,
            "unit": "B/op",
            "extra": "375 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "375 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31263569,
            "unit": "ns/op\t  711889 B/op\t    5766 allocs/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31263569,
            "unit": "ns/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711889,
            "unit": "B/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 300082964,
            "unit": "ns/op\t 6840866 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 300082964,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840866,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10757570,
            "unit": "ns/op\t 5900189 B/op\t   80036 allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10757570,
            "unit": "ns/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900189,
            "unit": "B/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.521,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "466099672 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.521,
            "unit": "ns/op",
            "extra": "466099672 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "466099672 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "466099672 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2011324,
            "unit": "ns/op\t 1194932 B/op\t   30006 allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2011324,
            "unit": "ns/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194932,
            "unit": "B/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1549450,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "751 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1549450,
            "unit": "ns/op",
            "extra": "751 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "751 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "751 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 572107,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "2013 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 572107,
            "unit": "ns/op",
            "extra": "2013 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "2013 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2013 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1716326,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "656 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1716326,
            "unit": "ns/op",
            "extra": "656 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "656 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "656 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5532115,
            "unit": "ns/op\t 5224570 B/op\t   31898 allocs/op",
            "extra": "223 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5532115,
            "unit": "ns/op",
            "extra": "223 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224570,
            "unit": "B/op",
            "extra": "223 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31898,
            "unit": "allocs/op",
            "extra": "223 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 43784811,
            "unit": "ns/op\t47388966 B/op\t  316308 allocs/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 43784811,
            "unit": "ns/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47388966,
            "unit": "B/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316308,
            "unit": "allocs/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 416073145,
            "unit": "ns/op\t577848946 B/op\t 3160407 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 416073145,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848946,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160407,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 252168518,
            "unit": "ns/op\t577834600 B/op\t 3160394 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 252168518,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577834600,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160394,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "49dfa15fe0dde6f7ae40c68ea236bd900585c335",
          "message": "fix(e2e): trying to fix flakey e2e tests",
          "timestamp": "2026-04-08T23:17:21-04:00",
          "tree_id": "42f9e76d1783008ddca7e69713aeb03184b4cd99",
          "url": "https://github.com/billdaws/bookmanager/commit/49dfa15fe0dde6f7ae40c68ea236bd900585c335"
        },
        "date": 1775704697281,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 213549,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5612 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 213549,
            "unit": "ns/op",
            "extra": "5612 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5612 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5612 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1638485,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "717 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1638485,
            "unit": "ns/op",
            "extra": "717 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "717 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "717 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 17458263,
            "unit": "ns/op\t 5900188 B/op\t   80036 allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 17458263,
            "unit": "ns/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900188,
            "unit": "B/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3205175,
            "unit": "ns/op\t  143668 B/op\t    1261 allocs/op",
            "extra": "362 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3205175,
            "unit": "ns/op",
            "extra": "362 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 143668,
            "unit": "B/op",
            "extra": "362 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "362 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31433847,
            "unit": "ns/op\t  711897 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31433847,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711897,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 299238524,
            "unit": "ns/op\t 6840918 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 299238524,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840918,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10377667,
            "unit": "ns/op\t 5900190 B/op\t   80036 allocs/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10377667,
            "unit": "ns/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900190,
            "unit": "B/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.534,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "474703044 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.534,
            "unit": "ns/op",
            "extra": "474703044 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "474703044 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "474703044 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1962722,
            "unit": "ns/op\t 1194932 B/op\t   30006 allocs/op",
            "extra": "622 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1962722,
            "unit": "ns/op",
            "extra": "622 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194932,
            "unit": "B/op",
            "extra": "622 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "622 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1482738,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "811 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1482738,
            "unit": "ns/op",
            "extra": "811 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "811 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "811 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 562188,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1938 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 562188,
            "unit": "ns/op",
            "extra": "1938 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1938 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1938 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1676627,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "706 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1676627,
            "unit": "ns/op",
            "extra": "706 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "706 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "706 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5568347,
            "unit": "ns/op\t 5224813 B/op\t   31900 allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5568347,
            "unit": "ns/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224813,
            "unit": "B/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31900,
            "unit": "allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 45984940,
            "unit": "ns/op\t47389015 B/op\t  316309 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 45984940,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47389015,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316309,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 400011576,
            "unit": "ns/op\t577848682 B/op\t 3160409 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 400011576,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848682,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160409,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 264551299,
            "unit": "ns/op\t577841571 B/op\t 3160389 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 264551299,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577841571,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160389,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "78a247dcecdcbcbb91e97329c7b29263887b842f",
          "message": "ci: update runners to get rid of Node v20 warnings",
          "timestamp": "2026-04-08T23:21:41-04:00",
          "tree_id": "02b5e516889eb5b890ef77d22ff195b489b452d3",
          "url": "https://github.com/billdaws/bookmanager/commit/78a247dcecdcbcbb91e97329c7b29263887b842f"
        },
        "date": 1775704998166,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 221816,
            "unit": "ns/op\t   48024 B/op\t     825 allocs/op",
            "extra": "5421 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 221816,
            "unit": "ns/op",
            "extra": "5421 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48024,
            "unit": "B/op",
            "extra": "5421 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5421 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1629538,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "718 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1629538,
            "unit": "ns/op",
            "extra": "718 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "718 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "718 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 15792534,
            "unit": "ns/op\t 5900193 B/op\t   80036 allocs/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 15792534,
            "unit": "ns/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900193,
            "unit": "B/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3238321,
            "unit": "ns/op\t  144319 B/op\t    1261 allocs/op",
            "extra": "357 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3238321,
            "unit": "ns/op",
            "extra": "357 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 144319,
            "unit": "B/op",
            "extra": "357 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "357 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31239699,
            "unit": "ns/op\t  711867 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31239699,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711867,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 297129528,
            "unit": "ns/op\t 6840878 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 297129528,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840878,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10596234,
            "unit": "ns/op\t 5900191 B/op\t   80036 allocs/op",
            "extra": "118 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10596234,
            "unit": "ns/op",
            "extra": "118 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900191,
            "unit": "B/op",
            "extra": "118 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "118 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.521,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "458774646 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.521,
            "unit": "ns/op",
            "extra": "458774646 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "458774646 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "458774646 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1951578,
            "unit": "ns/op\t 1194931 B/op\t   30006 allocs/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1951578,
            "unit": "ns/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194931,
            "unit": "B/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1496666,
            "unit": "ns/op\t 1043057 B/op\t   20008 allocs/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1496666,
            "unit": "ns/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043057,
            "unit": "B/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 610628,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1929 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 610628,
            "unit": "ns/op",
            "extra": "1929 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1929 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1929 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1654406,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1654406,
            "unit": "ns/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5604892,
            "unit": "ns/op\t 5225103 B/op\t   31901 allocs/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5604892,
            "unit": "ns/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5225103,
            "unit": "B/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31901,
            "unit": "allocs/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 46832630,
            "unit": "ns/op\t47386282 B/op\t  316306 allocs/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 46832630,
            "unit": "ns/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47386282,
            "unit": "B/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316306,
            "unit": "allocs/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 404234494,
            "unit": "ns/op\t577847858 B/op\t 3160408 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 404234494,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577847858,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160408,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 268224025,
            "unit": "ns/op\t577840902 B/op\t 3160387 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 268224025,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577840902,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160387,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "5d4b39d601bbce4eb1950555fd39044ff0c2d655",
          "message": "docs(backlog): bug with author extraction",
          "timestamp": "2026-04-09T20:54:11-04:00",
          "tree_id": "9795b8754a6593b75f53d347fe2e2fb7b63a4e48",
          "url": "https://github.com/billdaws/bookmanager/commit/5d4b39d601bbce4eb1950555fd39044ff0c2d655"
        },
        "date": 1775782506113,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 211294,
            "unit": "ns/op\t   48024 B/op\t     825 allocs/op",
            "extra": "6057 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 211294,
            "unit": "ns/op",
            "extra": "6057 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48024,
            "unit": "B/op",
            "extra": "6057 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "6057 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1585567,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "754 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1585567,
            "unit": "ns/op",
            "extra": "754 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "754 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "754 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16377139,
            "unit": "ns/op\t 5900175 B/op\t   80036 allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16377139,
            "unit": "ns/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900175,
            "unit": "B/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3081787,
            "unit": "ns/op\t  140557 B/op\t    1261 allocs/op",
            "extra": "388 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3081787,
            "unit": "ns/op",
            "extra": "388 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 140557,
            "unit": "B/op",
            "extra": "388 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "388 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 33538635,
            "unit": "ns/op\t  711864 B/op\t    5766 allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 33538635,
            "unit": "ns/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711864,
            "unit": "B/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 319868483,
            "unit": "ns/op\t11036286 B/op\t   51007 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 319868483,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 11036286,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51007,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 9922014,
            "unit": "ns/op\t 5900193 B/op\t   80036 allocs/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 9922014,
            "unit": "ns/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900193,
            "unit": "B/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.846,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "416719972 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.846,
            "unit": "ns/op",
            "extra": "416719972 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "416719972 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "416719972 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1870967,
            "unit": "ns/op\t 1194940 B/op\t   30006 allocs/op",
            "extra": "627 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1870967,
            "unit": "ns/op",
            "extra": "627 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194940,
            "unit": "B/op",
            "extra": "627 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "627 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1390079,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1390079,
            "unit": "ns/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 574832,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "2037 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 574832,
            "unit": "ns/op",
            "extra": "2037 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "2037 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2037 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1521741,
            "unit": "ns/op\t 1123065 B/op\t   20009 allocs/op",
            "extra": "769 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1521741,
            "unit": "ns/op",
            "extra": "769 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123065,
            "unit": "B/op",
            "extra": "769 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "769 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5844542,
            "unit": "ns/op\t 5224927 B/op\t   31901 allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5844542,
            "unit": "ns/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224927,
            "unit": "B/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31901,
            "unit": "allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 46510964,
            "unit": "ns/op\t47387125 B/op\t  316306 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 46510964,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387125,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316306,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 411172843,
            "unit": "ns/op\t577847869 B/op\t 3160405 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 411172843,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577847869,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160405,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 261459482,
            "unit": "ns/op\t577846008 B/op\t 3160396 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 261459482,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577846008,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160396,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "4d409ca441121acd0ac32daa109e270f18da1b35",
          "message": "fix: bug with authors who have ; in their value, and some logging/error handling",
          "timestamp": "2026-04-30T12:09:57-04:00",
          "tree_id": "0f8107027345e718f887533f7f9302ab1b670608",
          "url": "https://github.com/billdaws/bookmanager/commit/4d409ca441121acd0ac32daa109e270f18da1b35"
        },
        "date": 1777565498056,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 230718,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5071 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 230718,
            "unit": "ns/op",
            "extra": "5071 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5071 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5071 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1668432,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1668432,
            "unit": "ns/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16628718,
            "unit": "ns/op\t 5900183 B/op\t   80036 allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16628718,
            "unit": "ns/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900183,
            "unit": "B/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3427549,
            "unit": "ns/op\t  148047 B/op\t    1363 allocs/op",
            "extra": "364 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3427549,
            "unit": "ns/op",
            "extra": "364 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 148047,
            "unit": "B/op",
            "extra": "364 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1363,
            "unit": "allocs/op",
            "extra": "364 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31655663,
            "unit": "ns/op\t  716498 B/op\t    5868 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31655663,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 716498,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5868,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 299385349,
            "unit": "ns/op\t 6845562 B/op\t   51099 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 299385349,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6845562,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51099,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10075054,
            "unit": "ns/op\t 5900191 B/op\t   80036 allocs/op",
            "extra": "117 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10075054,
            "unit": "ns/op",
            "extra": "117 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900191,
            "unit": "B/op",
            "extra": "117 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "117 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.493,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "481083578 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.493,
            "unit": "ns/op",
            "extra": "481083578 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "481083578 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "481083578 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1918749,
            "unit": "ns/op\t 1194941 B/op\t   30006 allocs/op",
            "extra": "615 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1918749,
            "unit": "ns/op",
            "extra": "615 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194941,
            "unit": "B/op",
            "extra": "615 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "615 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1469110,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1469110,
            "unit": "ns/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 592631,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1857 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 592631,
            "unit": "ns/op",
            "extra": "1857 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1857 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1857 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1485640,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1485640,
            "unit": "ns/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5775158,
            "unit": "ns/op\t 5224688 B/op\t   31901 allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5775158,
            "unit": "ns/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224688,
            "unit": "B/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31901,
            "unit": "allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 50640096,
            "unit": "ns/op\t47385618 B/op\t  316304 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 50640096,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47385618,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316304,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 424526703,
            "unit": "ns/op\t577848061 B/op\t 3160408 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 424526703,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848061,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160408,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 264898064,
            "unit": "ns/op\t577834662 B/op\t 3160387 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 264898064,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577834662,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160387,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "1c14f4a99359c2e55893215830e4127370114603",
          "message": "feat: email integration",
          "timestamp": "2026-04-30T19:50:31-04:00",
          "tree_id": "12fb76898f47f76c8af0a8f2822703b54a088608",
          "url": "https://github.com/billdaws/bookmanager/commit/1c14f4a99359c2e55893215830e4127370114603"
        },
        "date": 1777593837285,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 249825,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "4113 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 249825,
            "unit": "ns/op",
            "extra": "4113 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "4113 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "4113 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2038580,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "578 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2038580,
            "unit": "ns/op",
            "extra": "578 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "578 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "578 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 20463020,
            "unit": "ns/op\t 5900178 B/op\t   80036 allocs/op",
            "extra": "58 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 20463020,
            "unit": "ns/op",
            "extra": "58 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900178,
            "unit": "B/op",
            "extra": "58 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "58 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3038937,
            "unit": "ns/op\t  153396 B/op\t    1619 allocs/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3038937,
            "unit": "ns/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 153396,
            "unit": "B/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1619,
            "unit": "allocs/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31301632,
            "unit": "ns/op\t  726325 B/op\t    6124 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31301632,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 726325,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6124,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 295874550,
            "unit": "ns/op\t 6855362 B/op\t   51355 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 295874550,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6855362,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51355,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 12525076,
            "unit": "ns/op\t 5900195 B/op\t   80036 allocs/op",
            "extra": "94 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 12525076,
            "unit": "ns/op",
            "extra": "94 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900195,
            "unit": "B/op",
            "extra": "94 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "94 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.17,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "552183718 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.17,
            "unit": "ns/op",
            "extra": "552183718 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "552183718 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "552183718 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1960585,
            "unit": "ns/op\t 1194940 B/op\t   30006 allocs/op",
            "extra": "603 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1960585,
            "unit": "ns/op",
            "extra": "603 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194940,
            "unit": "B/op",
            "extra": "603 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "603 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1335122,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "895 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1335122,
            "unit": "ns/op",
            "extra": "895 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "895 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "895 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 638152,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1729 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 638152,
            "unit": "ns/op",
            "extra": "1729 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1729 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1729 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1448143,
            "unit": "ns/op\t 1123065 B/op\t   20009 allocs/op",
            "extra": "825 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1448143,
            "unit": "ns/op",
            "extra": "825 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123065,
            "unit": "B/op",
            "extra": "825 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "825 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6389086,
            "unit": "ns/op\t 5539922 B/op\t   33702 allocs/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6389086,
            "unit": "ns/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5539922,
            "unit": "B/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 33702,
            "unit": "allocs/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 51821774,
            "unit": "ns/op\t67313388 B/op\t  334300 allocs/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 51821774,
            "unit": "ns/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 67313388,
            "unit": "B/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 334300,
            "unit": "allocs/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 466796808,
            "unit": "ns/op\t609370890 B/op\t 3340410 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 466796808,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 609370890,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3340410,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 313182620,
            "unit": "ns/op\t609352138 B/op\t 3340389 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 313182620,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 609352138,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3340389,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "02903f44488d03501eea9d0ec4f6bf6b99fa9703",
          "message": "feat: cover handling and gallery view",
          "timestamp": "2026-05-01T14:58:36-04:00",
          "tree_id": "f22ed53893fffcee284d529ba50eeeda941a9b80",
          "url": "https://github.com/billdaws/bookmanager/commit/02903f44488d03501eea9d0ec4f6bf6b99fa9703"
        },
        "date": 1777662020816,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 228462,
            "unit": "ns/op\t   57536 B/op\t     826 allocs/op",
            "extra": "5126 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 228462,
            "unit": "ns/op",
            "extra": "5126 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57536,
            "unit": "B/op",
            "extra": "5126 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5126 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1810659,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1810659,
            "unit": "ns/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19509198,
            "unit": "ns/op\t 6748022 B/op\t   80037 allocs/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19509198,
            "unit": "ns/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748022,
            "unit": "B/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4454333,
            "unit": "ns/op\t  186273 B/op\t    1704 allocs/op",
            "extra": "267 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4454333,
            "unit": "ns/op",
            "extra": "267 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 186273,
            "unit": "B/op",
            "extra": "267 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "267 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 36336153,
            "unit": "ns/op\t  811062 B/op\t    6209 allocs/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 36336153,
            "unit": "ns/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811062,
            "unit": "B/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 337673004,
            "unit": "ns/op\t 7677216 B/op\t   51439 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 337673004,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677216,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51439,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11979183,
            "unit": "ns/op\t 6748041 B/op\t   80037 allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11979183,
            "unit": "ns/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748041,
            "unit": "B/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.824,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "424812160 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.824,
            "unit": "ns/op",
            "extra": "424812160 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "424812160 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "424812160 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1927503,
            "unit": "ns/op\t 1358781 B/op\t   30006 allocs/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1927503,
            "unit": "ns/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358781,
            "unit": "B/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1434145,
            "unit": "ns/op\t 1206890 B/op\t   20008 allocs/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1434145,
            "unit": "ns/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206890,
            "unit": "B/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 609733,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1773 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 609733,
            "unit": "ns/op",
            "extra": "1773 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1773 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1773 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1552768,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1552768,
            "unit": "ns/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6288215,
            "unit": "ns/op\t 5310129 B/op\t   29675 allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6288215,
            "unit": "ns/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5310129,
            "unit": "B/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29675,
            "unit": "allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 45618330,
            "unit": "ns/op\t64984655 B/op\t  294270 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 45618330,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64984655,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294270,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 416055008,
            "unit": "ns/op\t586338768 B/op\t 2940367 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 416055008,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586338768,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940367,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 276053367,
            "unit": "ns/op\t586333044 B/op\t 2940359 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 276053367,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586333044,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940359,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "0df71547694a7341e3a839bec135317f5a22e193",
          "message": "perf: parallelize metadata extraction",
          "timestamp": "2026-05-01T15:39:15-04:00",
          "tree_id": "f068e2ef1772bed33d12a05f5cee411ee2705e85",
          "url": "https://github.com/billdaws/bookmanager/commit/0df71547694a7341e3a839bec135317f5a22e193"
        },
        "date": 1777664448563,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 215372,
            "unit": "ns/op\t   57536 B/op\t     826 allocs/op",
            "extra": "5602 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 215372,
            "unit": "ns/op",
            "extra": "5602 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57536,
            "unit": "B/op",
            "extra": "5602 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5602 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1803890,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "657 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1803890,
            "unit": "ns/op",
            "extra": "657 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "657 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "657 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19310297,
            "unit": "ns/op\t 6748034 B/op\t   80037 allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19310297,
            "unit": "ns/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748034,
            "unit": "B/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4228966,
            "unit": "ns/op\t  182726 B/op\t    1704 allocs/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4228966,
            "unit": "ns/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 182726,
            "unit": "B/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 35681834,
            "unit": "ns/op\t  811056 B/op\t    6209 allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 35681834,
            "unit": "ns/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811056,
            "unit": "B/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 332529359,
            "unit": "ns/op\t 7677390 B/op\t   51440 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 332529359,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677390,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51440,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11143127,
            "unit": "ns/op\t 6748041 B/op\t   80037 allocs/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11143127,
            "unit": "ns/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748041,
            "unit": "B/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.82,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "425722639 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.82,
            "unit": "ns/op",
            "extra": "425722639 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "425722639 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "425722639 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1836324,
            "unit": "ns/op\t 1358779 B/op\t   30006 allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1836324,
            "unit": "ns/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358779,
            "unit": "B/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1387706,
            "unit": "ns/op\t 1206896 B/op\t   20008 allocs/op",
            "extra": "862 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1387706,
            "unit": "ns/op",
            "extra": "862 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206896,
            "unit": "B/op",
            "extra": "862 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "862 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 586598,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1928 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 586598,
            "unit": "ns/op",
            "extra": "1928 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1928 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1928 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1767730,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1767730,
            "unit": "ns/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5937107,
            "unit": "ns/op\t 5307946 B/op\t   29676 allocs/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5937107,
            "unit": "ns/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5307946,
            "unit": "B/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29676,
            "unit": "allocs/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 45712961,
            "unit": "ns/op\t64960900 B/op\t  294271 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 45712961,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64960900,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294271,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 425728442,
            "unit": "ns/op\t586098893 B/op\t 2940371 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 425728442,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586098893,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940371,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 250845614,
            "unit": "ns/op\t586097782 B/op\t 2940367 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 250845614,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586097782,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940367,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "2061e2f87780c4f4b1a306af92e10417767eb8bc",
          "message": "perf: hoist upsert into prepared statement",
          "timestamp": "2026-05-01T15:50:25-04:00",
          "tree_id": "5d817dfb52ac35c180df58b06cc806e06ff2368b",
          "url": "https://github.com/billdaws/bookmanager/commit/2061e2f87780c4f4b1a306af92e10417767eb8bc"
        },
        "date": 1777665120300,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 239794,
            "unit": "ns/op\t   57536 B/op\t     826 allocs/op",
            "extra": "4696 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 239794,
            "unit": "ns/op",
            "extra": "4696 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57536,
            "unit": "B/op",
            "extra": "4696 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "4696 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1916514,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "638 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1916514,
            "unit": "ns/op",
            "extra": "638 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "638 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "638 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19118609,
            "unit": "ns/op\t 6748032 B/op\t   80037 allocs/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19118609,
            "unit": "ns/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748032,
            "unit": "B/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4399059,
            "unit": "ns/op\t  183797 B/op\t    1704 allocs/op",
            "extra": "278 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4399059,
            "unit": "ns/op",
            "extra": "278 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 183797,
            "unit": "B/op",
            "extra": "278 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "278 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 33928394,
            "unit": "ns/op\t  811074 B/op\t    6209 allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 33928394,
            "unit": "ns/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811074,
            "unit": "B/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 312926795,
            "unit": "ns/op\t 7677394 B/op\t   51440 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 312926795,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677394,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51440,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11898193,
            "unit": "ns/op\t 6748042 B/op\t   80037 allocs/op",
            "extra": "102 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11898193,
            "unit": "ns/op",
            "extra": "102 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748042,
            "unit": "B/op",
            "extra": "102 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "102 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.508,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "468679130 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.508,
            "unit": "ns/op",
            "extra": "468679130 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "468679130 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "468679130 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2102714,
            "unit": "ns/op\t 1358782 B/op\t   30006 allocs/op",
            "extra": "618 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2102714,
            "unit": "ns/op",
            "extra": "618 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358782,
            "unit": "B/op",
            "extra": "618 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "618 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1438287,
            "unit": "ns/op\t 1206891 B/op\t   20008 allocs/op",
            "extra": "801 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1438287,
            "unit": "ns/op",
            "extra": "801 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206891,
            "unit": "B/op",
            "extra": "801 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "801 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 591766,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1959 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 591766,
            "unit": "ns/op",
            "extra": "1959 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1959 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1959 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1561406,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "688 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1561406,
            "unit": "ns/op",
            "extra": "688 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "688 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "688 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5650338,
            "unit": "ns/op\t 5309815 B/op\t   29672 allocs/op",
            "extra": "219 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5650338,
            "unit": "ns/op",
            "extra": "219 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5309815,
            "unit": "B/op",
            "extra": "219 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29672,
            "unit": "allocs/op",
            "extra": "219 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 47830244,
            "unit": "ns/op\t64985058 B/op\t  294271 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 47830244,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64985058,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294271,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 432596806,
            "unit": "ns/op\t586339754 B/op\t 2940370 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 432596806,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586339754,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940370,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 253601870,
            "unit": "ns/op\t586334840 B/op\t 2940363 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 253601870,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586334840,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940363,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "fc646129b1f8d59803477715ff15769fe51496fa",
          "message": "feat: visual indicator when the metadata job is running",
          "timestamp": "2026-05-01T17:19:03-04:00",
          "tree_id": "1ecfba32caaf945333b391d2ca37d164d98ac34f",
          "url": "https://github.com/billdaws/bookmanager/commit/fc646129b1f8d59803477715ff15769fe51496fa"
        },
        "date": 1777670444074,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 227519,
            "unit": "ns/op\t   57537 B/op\t     826 allocs/op",
            "extra": "5094 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 227519,
            "unit": "ns/op",
            "extra": "5094 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57537,
            "unit": "B/op",
            "extra": "5094 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5094 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1835544,
            "unit": "ns/op\t  485538 B/op\t    8029 allocs/op",
            "extra": "654 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1835544,
            "unit": "ns/op",
            "extra": "654 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485538,
            "unit": "B/op",
            "extra": "654 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "654 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 18858527,
            "unit": "ns/op\t 6748020 B/op\t   80037 allocs/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 18858527,
            "unit": "ns/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748020,
            "unit": "B/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4362180,
            "unit": "ns/op\t  184245 B/op\t    1704 allocs/op",
            "extra": "276 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4362180,
            "unit": "ns/op",
            "extra": "276 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 184245,
            "unit": "B/op",
            "extra": "276 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "276 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 34059822,
            "unit": "ns/op\t  811061 B/op\t    6209 allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 34059822,
            "unit": "ns/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811061,
            "unit": "B/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 311401271,
            "unit": "ns/op\t 7677382 B/op\t   51440 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 311401271,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677382,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51440,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11597516,
            "unit": "ns/op\t 6748039 B/op\t   80037 allocs/op",
            "extra": "110 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11597516,
            "unit": "ns/op",
            "extra": "110 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748039,
            "unit": "B/op",
            "extra": "110 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "110 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.48,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "484607371 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.48,
            "unit": "ns/op",
            "extra": "484607371 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "484607371 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "484607371 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1975316,
            "unit": "ns/op\t 1358771 B/op\t   30006 allocs/op",
            "extra": "594 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1975316,
            "unit": "ns/op",
            "extra": "594 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358771,
            "unit": "B/op",
            "extra": "594 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "594 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1451637,
            "unit": "ns/op\t 1206897 B/op\t   20008 allocs/op",
            "extra": "818 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1451637,
            "unit": "ns/op",
            "extra": "818 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206897,
            "unit": "B/op",
            "extra": "818 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "818 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 577219,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "2082 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 577219,
            "unit": "ns/op",
            "extra": "2082 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "2082 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2082 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1524467,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "739 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1524467,
            "unit": "ns/op",
            "extra": "739 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "739 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "739 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5736208,
            "unit": "ns/op\t 5309214 B/op\t   29678 allocs/op",
            "extra": "211 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5736208,
            "unit": "ns/op",
            "extra": "211 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5309214,
            "unit": "B/op",
            "extra": "211 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29678,
            "unit": "allocs/op",
            "extra": "211 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 43558392,
            "unit": "ns/op\t64986248 B/op\t  294276 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 43558392,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64986248,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294276,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 402870786,
            "unit": "ns/op\t586341514 B/op\t 2940373 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 402870786,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586341514,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940373,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 260842727,
            "unit": "ns/op\t586335580 B/op\t 2940363 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 260842727,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586335580,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940363,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "cd516dbfb9af02d0a00d6343401c5d8f7ff8bd97",
          "message": "feat: visual indicator when the metadata job is running",
          "timestamp": "2026-05-01T17:50:58-04:00",
          "tree_id": "87294647f0a6a397f2c7611f5277d84c0e3f2c90",
          "url": "https://github.com/billdaws/bookmanager/commit/cd516dbfb9af02d0a00d6343401c5d8f7ff8bd97"
        },
        "date": 1777672362549,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 169452,
            "unit": "ns/op\t   57537 B/op\t     826 allocs/op",
            "extra": "6734 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 169452,
            "unit": "ns/op",
            "extra": "6734 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57537,
            "unit": "B/op",
            "extra": "6734 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "6734 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1376716,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "850 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1376716,
            "unit": "ns/op",
            "extra": "850 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "850 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "850 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 14748987,
            "unit": "ns/op\t 6748028 B/op\t   80037 allocs/op",
            "extra": "91 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 14748987,
            "unit": "ns/op",
            "extra": "91 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748028,
            "unit": "B/op",
            "extra": "91 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "91 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3181846,
            "unit": "ns/op\t  167672 B/op\t    1704 allocs/op",
            "extra": "379 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3181846,
            "unit": "ns/op",
            "extra": "379 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 167672,
            "unit": "B/op",
            "extra": "379 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "379 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 27743985,
            "unit": "ns/op\t  811067 B/op\t    6209 allocs/op",
            "extra": "43 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 27743985,
            "unit": "ns/op",
            "extra": "43 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811067,
            "unit": "B/op",
            "extra": "43 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "43 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 260418162,
            "unit": "ns/op\t 7677390 B/op\t   51440 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 260418162,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677390,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51440,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 8522744,
            "unit": "ns/op\t 6748036 B/op\t   80037 allocs/op",
            "extra": "132 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 8522744,
            "unit": "ns/op",
            "extra": "132 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748036,
            "unit": "B/op",
            "extra": "132 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "132 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.184,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "549418016 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.184,
            "unit": "ns/op",
            "extra": "549418016 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "549418016 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "549418016 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1507237,
            "unit": "ns/op\t 1358772 B/op\t   30006 allocs/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1507237,
            "unit": "ns/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358772,
            "unit": "B/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1083984,
            "unit": "ns/op\t 1206896 B/op\t   20008 allocs/op",
            "extra": "1046 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1083984,
            "unit": "ns/op",
            "extra": "1046 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206896,
            "unit": "B/op",
            "extra": "1046 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "1046 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 460514,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "2488 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 460514,
            "unit": "ns/op",
            "extra": "2488 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "2488 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2488 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1213818,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "992 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1213818,
            "unit": "ns/op",
            "extra": "992 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "992 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "992 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 4223920,
            "unit": "ns/op\t 5310495 B/op\t   29671 allocs/op",
            "extra": "280 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 4223920,
            "unit": "ns/op",
            "extra": "280 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5310495,
            "unit": "B/op",
            "extra": "280 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29671,
            "unit": "allocs/op",
            "extra": "280 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 33626286,
            "unit": "ns/op\t64985492 B/op\t  294275 allocs/op",
            "extra": "30 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 33626286,
            "unit": "ns/op",
            "extra": "30 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64985492,
            "unit": "B/op",
            "extra": "30 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294275,
            "unit": "allocs/op",
            "extra": "30 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 321059232,
            "unit": "ns/op\t586340062 B/op\t 2940371 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 321059232,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586340062,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940371,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 190414751,
            "unit": "ns/op\t586328668 B/op\t 2940363 allocs/op",
            "extra": "6 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 190414751,
            "unit": "ns/op",
            "extra": "6 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586328668,
            "unit": "B/op",
            "extra": "6 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940363,
            "unit": "allocs/op",
            "extra": "6 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "eba232f0e500e0c5d06f6dc4570708cbf716f6ef",
          "message": "feat: visual indicator when the metadata job is running",
          "timestamp": "2026-05-01T18:11:39-04:00",
          "tree_id": "80bc86732eba48cd54cd32ef8b244b69f2893ca7",
          "url": "https://github.com/billdaws/bookmanager/commit/eba232f0e500e0c5d06f6dc4570708cbf716f6ef"
        },
        "date": 1777673593455,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 233991,
            "unit": "ns/op\t   57537 B/op\t     826 allocs/op",
            "extra": "5017 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 233991,
            "unit": "ns/op",
            "extra": "5017 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57537,
            "unit": "B/op",
            "extra": "5017 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5017 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1796448,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1796448,
            "unit": "ns/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19775732,
            "unit": "ns/op\t 6748026 B/op\t   80037 allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19775732,
            "unit": "ns/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748026,
            "unit": "B/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4270314,
            "unit": "ns/op\t  181691 B/op\t    1704 allocs/op",
            "extra": "288 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4270314,
            "unit": "ns/op",
            "extra": "288 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 181691,
            "unit": "B/op",
            "extra": "288 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "288 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 34123188,
            "unit": "ns/op\t  811085 B/op\t    6209 allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 34123188,
            "unit": "ns/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811085,
            "unit": "B/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 314400990,
            "unit": "ns/op\t 7677474 B/op\t   51441 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 314400990,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677474,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51441,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11260330,
            "unit": "ns/op\t 6748046 B/op\t   80037 allocs/op",
            "extra": "104 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11260330,
            "unit": "ns/op",
            "extra": "104 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748046,
            "unit": "B/op",
            "extra": "104 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "104 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.474,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "484034641 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.474,
            "unit": "ns/op",
            "extra": "484034641 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "484034641 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "484034641 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1946228,
            "unit": "ns/op\t 1358780 B/op\t   30006 allocs/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1946228,
            "unit": "ns/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358780,
            "unit": "B/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1459687,
            "unit": "ns/op\t 1206890 B/op\t   20008 allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1459687,
            "unit": "ns/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206890,
            "unit": "B/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 596901,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1915 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 596901,
            "unit": "ns/op",
            "extra": "1915 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1915 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1915 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1524608,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "780 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1524608,
            "unit": "ns/op",
            "extra": "780 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "780 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "780 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6302618,
            "unit": "ns/op\t 5311674 B/op\t   29682 allocs/op",
            "extra": "188 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6302618,
            "unit": "ns/op",
            "extra": "188 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5311674,
            "unit": "B/op",
            "extra": "188 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29682,
            "unit": "allocs/op",
            "extra": "188 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 42924983,
            "unit": "ns/op\t64986521 B/op\t  294276 allocs/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 42924983,
            "unit": "ns/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64986521,
            "unit": "B/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294276,
            "unit": "allocs/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 407536307,
            "unit": "ns/op\t586341760 B/op\t 2940375 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 407536307,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586341760,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940375,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 261045026,
            "unit": "ns/op\t586334916 B/op\t 2940366 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 261045026,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586334916,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940366,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "3c8da8f6015ca73287eaf53e634e414b43a0aff6",
          "message": "feat: visual indicator when the metadata job is running",
          "timestamp": "2026-05-02T12:25:38-04:00",
          "tree_id": "92caab32e3b131ad7d649573c044359a690dda4b",
          "url": "https://github.com/billdaws/bookmanager/commit/3c8da8f6015ca73287eaf53e634e414b43a0aff6"
        },
        "date": 1777739228543,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 221685,
            "unit": "ns/op\t   57537 B/op\t     826 allocs/op",
            "extra": "5618 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 221685,
            "unit": "ns/op",
            "extra": "5618 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57537,
            "unit": "B/op",
            "extra": "5618 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5618 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1818962,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1818962,
            "unit": "ns/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 18986308,
            "unit": "ns/op\t 6748022 B/op\t   80037 allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 18986308,
            "unit": "ns/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748022,
            "unit": "B/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4263693,
            "unit": "ns/op\t  183796 B/op\t    1704 allocs/op",
            "extra": "278 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4263693,
            "unit": "ns/op",
            "extra": "278 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 183796,
            "unit": "B/op",
            "extra": "278 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "278 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 35679628,
            "unit": "ns/op\t  811058 B/op\t    6209 allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 35679628,
            "unit": "ns/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811058,
            "unit": "B/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 343112187,
            "unit": "ns/op\t 7677536 B/op\t   51439 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 343112187,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677536,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51439,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11245932,
            "unit": "ns/op\t 6748041 B/op\t   80037 allocs/op",
            "extra": "109 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11245932,
            "unit": "ns/op",
            "extra": "109 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748041,
            "unit": "B/op",
            "extra": "109 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "109 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.822,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "422013064 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.822,
            "unit": "ns/op",
            "extra": "422013064 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "422013064 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "422013064 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1861721,
            "unit": "ns/op\t 1358772 B/op\t   30006 allocs/op",
            "extra": "630 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1861721,
            "unit": "ns/op",
            "extra": "630 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358772,
            "unit": "B/op",
            "extra": "630 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "630 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1412965,
            "unit": "ns/op\t 1206898 B/op\t   20008 allocs/op",
            "extra": "818 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1412965,
            "unit": "ns/op",
            "extra": "818 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206898,
            "unit": "B/op",
            "extra": "818 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "818 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 574356,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1902 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 574356,
            "unit": "ns/op",
            "extra": "1902 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1902 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1902 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1568335,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "736 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1568335,
            "unit": "ns/op",
            "extra": "736 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "736 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "736 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5996241,
            "unit": "ns/op\t 5310871 B/op\t   29679 allocs/op",
            "extra": "205 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5996241,
            "unit": "ns/op",
            "extra": "205 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5310871,
            "unit": "B/op",
            "extra": "205 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29679,
            "unit": "allocs/op",
            "extra": "205 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 48593537,
            "unit": "ns/op\t64986066 B/op\t  294276 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 48593537,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64986066,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294276,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 415977613,
            "unit": "ns/op\t586341685 B/op\t 2940372 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 415977613,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586341685,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940372,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 260501168,
            "unit": "ns/op\t586327428 B/op\t 2940369 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 260501168,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586327428,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940369,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "c46303f0854c61e0381a80b1524f01482627d399",
          "message": "fix: air config",
          "timestamp": "2026-05-04T21:18:14-04:00",
          "tree_id": "3fc634ba6b8dd506d2d7e910a3d0df60a1a1ad0d",
          "url": "https://github.com/billdaws/bookmanager/commit/c46303f0854c61e0381a80b1524f01482627d399"
        },
        "date": 1777943985145,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 252836,
            "unit": "ns/op\t   57537 B/op\t     826 allocs/op",
            "extra": "4206 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 252836,
            "unit": "ns/op",
            "extra": "4206 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57537,
            "unit": "B/op",
            "extra": "4206 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "4206 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1808443,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1808443,
            "unit": "ns/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19051144,
            "unit": "ns/op\t 6748024 B/op\t   80037 allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19051144,
            "unit": "ns/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748024,
            "unit": "B/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4212217,
            "unit": "ns/op\t  199144 B/op\t    1704 allocs/op",
            "extra": "277 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4212217,
            "unit": "ns/op",
            "extra": "277 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 199144,
            "unit": "B/op",
            "extra": "277 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "277 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 34201546,
            "unit": "ns/op\t  811087 B/op\t    6209 allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 34201546,
            "unit": "ns/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811087,
            "unit": "B/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 316061206,
            "unit": "ns/op\t 7677942 B/op\t   51443 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 316061206,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677942,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51443,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11252287,
            "unit": "ns/op\t 6748042 B/op\t   80037 allocs/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11252287,
            "unit": "ns/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748042,
            "unit": "B/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.477,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "481041016 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.477,
            "unit": "ns/op",
            "extra": "481041016 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "481041016 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "481041016 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1957675,
            "unit": "ns/op\t 1358781 B/op\t   30006 allocs/op",
            "extra": "588 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1957675,
            "unit": "ns/op",
            "extra": "588 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358781,
            "unit": "B/op",
            "extra": "588 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "588 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1439810,
            "unit": "ns/op\t 1206891 B/op\t   20008 allocs/op",
            "extra": "828 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1439810,
            "unit": "ns/op",
            "extra": "828 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206891,
            "unit": "B/op",
            "extra": "828 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "828 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 568072,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1863 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 568072,
            "unit": "ns/op",
            "extra": "1863 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1863 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1863 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1563089,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "710 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1563089,
            "unit": "ns/op",
            "extra": "710 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "710 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "710 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5805137,
            "unit": "ns/op\t 5311409 B/op\t   29679 allocs/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5805137,
            "unit": "ns/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5311409,
            "unit": "B/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29679,
            "unit": "allocs/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 46829281,
            "unit": "ns/op\t64986412 B/op\t  294276 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 46829281,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64986412,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294276,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 396253738,
            "unit": "ns/op\t586340722 B/op\t 2940373 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 396253738,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586340722,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940373,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 256066216,
            "unit": "ns/op\t586326732 B/op\t 2940363 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 256066216,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586326732,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940363,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "87152c5c8aa81cfa0a81cada6da128d4165dc5b2",
          "message": "docs: backlog and some future tasks",
          "timestamp": "2026-05-04T21:20:05-04:00",
          "tree_id": "1253363fd40ca6706a68e445d4a5494b0b320917",
          "url": "https://github.com/billdaws/bookmanager/commit/87152c5c8aa81cfa0a81cada6da128d4165dc5b2"
        },
        "date": 1777944092341,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 225211,
            "unit": "ns/op\t   57536 B/op\t     826 allocs/op",
            "extra": "5390 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 225211,
            "unit": "ns/op",
            "extra": "5390 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57536,
            "unit": "B/op",
            "extra": "5390 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5390 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1787334,
            "unit": "ns/op\t  485538 B/op\t    8029 allocs/op",
            "extra": "662 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1787334,
            "unit": "ns/op",
            "extra": "662 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485538,
            "unit": "B/op",
            "extra": "662 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "662 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 18097043,
            "unit": "ns/op\t 6748019 B/op\t   80037 allocs/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 18097043,
            "unit": "ns/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748019,
            "unit": "B/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4089909,
            "unit": "ns/op\t  180517 B/op\t    1704 allocs/op",
            "extra": "294 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4089909,
            "unit": "ns/op",
            "extra": "294 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 180517,
            "unit": "B/op",
            "extra": "294 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "294 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 33735546,
            "unit": "ns/op\t  811068 B/op\t    6209 allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 33735546,
            "unit": "ns/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811068,
            "unit": "B/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 314665824,
            "unit": "ns/op\t 7677706 B/op\t   51442 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 314665824,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677706,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51442,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11527711,
            "unit": "ns/op\t 6748040 B/op\t   80037 allocs/op",
            "extra": "104 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11527711,
            "unit": "ns/op",
            "extra": "104 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748040,
            "unit": "B/op",
            "extra": "104 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "104 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.478,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "484246356 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.478,
            "unit": "ns/op",
            "extra": "484246356 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "484246356 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "484246356 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1904340,
            "unit": "ns/op\t 1358780 B/op\t   30006 allocs/op",
            "extra": "602 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1904340,
            "unit": "ns/op",
            "extra": "602 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358780,
            "unit": "B/op",
            "extra": "602 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "602 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1435115,
            "unit": "ns/op\t 1206891 B/op\t   20008 allocs/op",
            "extra": "830 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1435115,
            "unit": "ns/op",
            "extra": "830 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206891,
            "unit": "B/op",
            "extra": "830 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "830 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 614983,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1772 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 614983,
            "unit": "ns/op",
            "extra": "1772 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1772 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1772 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1532174,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "774 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1532174,
            "unit": "ns/op",
            "extra": "774 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "774 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "774 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5582695,
            "unit": "ns/op\t 5310977 B/op\t   29676 allocs/op",
            "extra": "228 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5582695,
            "unit": "ns/op",
            "extra": "228 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5310977,
            "unit": "B/op",
            "extra": "228 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29676,
            "unit": "allocs/op",
            "extra": "228 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 41708608,
            "unit": "ns/op\t64985611 B/op\t  294275 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 41708608,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64985611,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294275,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 410714909,
            "unit": "ns/op\t586340896 B/op\t 2940374 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 410714909,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586340896,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940374,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 253761832,
            "unit": "ns/op\t586335227 B/op\t 2940366 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 253761832,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586335227,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940366,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "ed5709adcc04a8d8772f2c7bfe1f8a34ba2c8f74",
          "message": "feat: pagination",
          "timestamp": "2026-05-05T18:29:42-04:00",
          "tree_id": "d8d1c1c5ff59b58ff64df6537845f21ce66630aa",
          "url": "https://github.com/billdaws/bookmanager/commit/ed5709adcc04a8d8772f2c7bfe1f8a34ba2c8f74"
        },
        "date": 1778020281623,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 242376,
            "unit": "ns/op\t   57536 B/op\t     826 allocs/op",
            "extra": "4906 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 242376,
            "unit": "ns/op",
            "extra": "4906 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57536,
            "unit": "B/op",
            "extra": "4906 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "4906 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1822344,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1822344,
            "unit": "ns/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19121438,
            "unit": "ns/op\t 6748044 B/op\t   80037 allocs/op",
            "extra": "68 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19121438,
            "unit": "ns/op",
            "extra": "68 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748044,
            "unit": "B/op",
            "extra": "68 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "68 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4327644,
            "unit": "ns/op\t  182751 B/op\t    1704 allocs/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4327644,
            "unit": "ns/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 182751,
            "unit": "B/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 34042847,
            "unit": "ns/op\t  811065 B/op\t    6209 allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 34042847,
            "unit": "ns/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811065,
            "unit": "B/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 320530372,
            "unit": "ns/op\t 7677358 B/op\t   51440 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 320530372,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677358,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51440,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11259423,
            "unit": "ns/op\t 6748041 B/op\t   80037 allocs/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11259423,
            "unit": "ns/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748041,
            "unit": "B/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.497,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "479887066 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.497,
            "unit": "ns/op",
            "extra": "479887066 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "479887066 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "479887066 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1988457,
            "unit": "ns/op\t 1358781 B/op\t   30006 allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1988457,
            "unit": "ns/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358781,
            "unit": "B/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1441633,
            "unit": "ns/op\t 1206890 B/op\t   20008 allocs/op",
            "extra": "830 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1441633,
            "unit": "ns/op",
            "extra": "830 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206890,
            "unit": "B/op",
            "extra": "830 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "830 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 581185,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1897 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 581185,
            "unit": "ns/op",
            "extra": "1897 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1897 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1897 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1665563,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "724 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1665563,
            "unit": "ns/op",
            "extra": "724 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "724 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "724 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5799498,
            "unit": "ns/op\t 5312040 B/op\t   29684 allocs/op",
            "extra": "200 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5799498,
            "unit": "ns/op",
            "extra": "200 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5312040,
            "unit": "B/op",
            "extra": "200 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29684,
            "unit": "allocs/op",
            "extra": "200 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 15119006,
            "unit": "ns/op\t11232896 B/op\t   67896 allocs/op",
            "extra": "86 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 15119006,
            "unit": "ns/op",
            "extra": "86 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11232896,
            "unit": "B/op",
            "extra": "86 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 67896,
            "unit": "allocs/op",
            "extra": "86 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 50314695,
            "unit": "ns/op\t21158644 B/op\t  166984 allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 50314695,
            "unit": "ns/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 21158644,
            "unit": "B/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 166984,
            "unit": "allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 28241400,
            "unit": "ns/op\t21153099 B/op\t  166976 allocs/op",
            "extra": "42 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 28241400,
            "unit": "ns/op",
            "extra": "42 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 21153099,
            "unit": "B/op",
            "extra": "42 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 166976,
            "unit": "allocs/op",
            "extra": "42 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "607564ea9eb1027411c5d4491e07bd5e847ef385",
          "message": "feat: gotestfmt",
          "timestamp": "2026-05-05T18:31:43-04:00",
          "tree_id": "4f017103786d8ead3a52a3205427a44d2de91bee",
          "url": "https://github.com/billdaws/bookmanager/commit/607564ea9eb1027411c5d4491e07bd5e847ef385"
        },
        "date": 1778020399997,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 235524,
            "unit": "ns/op\t   57537 B/op\t     826 allocs/op",
            "extra": "5008 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 235524,
            "unit": "ns/op",
            "extra": "5008 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57537,
            "unit": "B/op",
            "extra": "5008 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5008 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1785108,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1785108,
            "unit": "ns/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 18909364,
            "unit": "ns/op\t 6748021 B/op\t   80037 allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 18909364,
            "unit": "ns/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748021,
            "unit": "B/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4307075,
            "unit": "ns/op\t  184926 B/op\t    1704 allocs/op",
            "extra": "273 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4307075,
            "unit": "ns/op",
            "extra": "273 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 184926,
            "unit": "B/op",
            "extra": "273 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "273 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 34222172,
            "unit": "ns/op\t  811089 B/op\t    6209 allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 34222172,
            "unit": "ns/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811089,
            "unit": "B/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 326434398,
            "unit": "ns/op\t 7677394 B/op\t   51440 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 326434398,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677394,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51440,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11676052,
            "unit": "ns/op\t 6748042 B/op\t   80037 allocs/op",
            "extra": "105 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11676052,
            "unit": "ns/op",
            "extra": "105 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748042,
            "unit": "B/op",
            "extra": "105 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "105 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.529,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "456863889 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.529,
            "unit": "ns/op",
            "extra": "456863889 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "456863889 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "456863889 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1999324,
            "unit": "ns/op\t 1358780 B/op\t   30006 allocs/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1999324,
            "unit": "ns/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358780,
            "unit": "B/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1470373,
            "unit": "ns/op\t 1206891 B/op\t   20008 allocs/op",
            "extra": "802 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1470373,
            "unit": "ns/op",
            "extra": "802 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206891,
            "unit": "B/op",
            "extra": "802 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "802 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 617308,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1980 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 617308,
            "unit": "ns/op",
            "extra": "1980 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1980 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1980 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1676225,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "692 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1676225,
            "unit": "ns/op",
            "extra": "692 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "692 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "692 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5792799,
            "unit": "ns/op\t 5309324 B/op\t   29685 allocs/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5792799,
            "unit": "ns/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5309324,
            "unit": "B/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29685,
            "unit": "allocs/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 17046431,
            "unit": "ns/op\t11229244 B/op\t   67899 allocs/op",
            "extra": "64 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 17046431,
            "unit": "ns/op",
            "extra": "64 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11229244,
            "unit": "B/op",
            "extra": "64 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 67899,
            "unit": "allocs/op",
            "extra": "64 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 49201819,
            "unit": "ns/op\t21153370 B/op\t  166983 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 49201819,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 21153370,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 166983,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 29188819,
            "unit": "ns/op\t21151409 B/op\t  166976 allocs/op",
            "extra": "39 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 29188819,
            "unit": "ns/op",
            "extra": "39 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 21151409,
            "unit": "B/op",
            "extra": "39 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 166976,
            "unit": "allocs/op",
            "extra": "39 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "45471e4835f5c3339efb6f223f04993c9ad440a6",
          "message": "feat: series handling",
          "timestamp": "2026-05-06T19:18:46-04:00",
          "tree_id": "d639d0c267685b5d3e8f86236794e09f3d8b84ae",
          "url": "https://github.com/billdaws/bookmanager/commit/45471e4835f5c3339efb6f223f04993c9ad440a6"
        },
        "date": 1778109611060,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 338001,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "3739 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 338001,
            "unit": "ns/op",
            "extra": "3739 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "3739 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "3739 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3092800,
            "unit": "ns/op\t  946970 B/op\t   10033 allocs/op",
            "extra": "385 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3092800,
            "unit": "ns/op",
            "extra": "385 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946970,
            "unit": "B/op",
            "extra": "385 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "385 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 32767128,
            "unit": "ns/op\t10211968 B/op\t  100040 allocs/op",
            "extra": "39 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 32767128,
            "unit": "ns/op",
            "extra": "39 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211968,
            "unit": "B/op",
            "extra": "39 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "39 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4867946,
            "unit": "ns/op\t  226887 B/op\t    2352 allocs/op",
            "extra": "246 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4867946,
            "unit": "ns/op",
            "extra": "246 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 226887,
            "unit": "B/op",
            "extra": "246 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2352,
            "unit": "allocs/op",
            "extra": "246 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 40828030,
            "unit": "ns/op\t  882687 B/op\t    6857 allocs/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 40828030,
            "unit": "ns/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 882687,
            "unit": "B/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6857,
            "unit": "allocs/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 397721949,
            "unit": "ns/op\t 8109554 B/op\t   52089 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 397721949,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 8109554,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52089,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19779276,
            "unit": "ns/op\t10212007 B/op\t  100040 allocs/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19779276,
            "unit": "ns/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10212007,
            "unit": "B/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.244,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "528147967 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.244,
            "unit": "ns/op",
            "extra": "528147967 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "528147967 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "528147967 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2191314,
            "unit": "ns/op\t 1760190 B/op\t   30006 allocs/op",
            "extra": "529 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2191314,
            "unit": "ns/op",
            "extra": "529 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760190,
            "unit": "B/op",
            "extra": "529 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "529 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1437262,
            "unit": "ns/op\t 1608298 B/op\t   20008 allocs/op",
            "extra": "816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1437262,
            "unit": "ns/op",
            "extra": "816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608298,
            "unit": "B/op",
            "extra": "816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 628389,
            "unit": "ns/op\t 1368312 B/op\t       9 allocs/op",
            "extra": "1683 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 628389,
            "unit": "ns/op",
            "extra": "1683 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368312,
            "unit": "B/op",
            "extra": "1683 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1683 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1602506,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1602506,
            "unit": "ns/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6924053,
            "unit": "ns/op\t 5382907 B/op\t   30620 allocs/op",
            "extra": "183 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6924053,
            "unit": "ns/op",
            "extra": "183 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5382907,
            "unit": "B/op",
            "extra": "183 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30620,
            "unit": "allocs/op",
            "extra": "183 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 15737660,
            "unit": "ns/op\t11777286 B/op\t   71340 allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 15737660,
            "unit": "ns/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11777286,
            "unit": "B/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71340,
            "unit": "allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 64904315,
            "unit": "ns/op\t24703975 B/op\t  188422 allocs/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 64904315,
            "unit": "ns/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24703975,
            "unit": "B/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188422,
            "unit": "allocs/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 37793187,
            "unit": "ns/op\t24699481 B/op\t  188415 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 37793187,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24699481,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188415,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "b3a1f13eac01aa9afc829354025fc19be37f4027",
          "message": "test: add -json tag so e2e tests work with gotestfmt",
          "timestamp": "2026-05-06T19:21:46-04:00",
          "tree_id": "f10dee794e247192d9a4ac00bf2ce4c4faba9876",
          "url": "https://github.com/billdaws/bookmanager/commit/b3a1f13eac01aa9afc829354025fc19be37f4027"
        },
        "date": 1778109809323,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 250403,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "4952 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 250403,
            "unit": "ns/op",
            "extra": "4952 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "4952 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "4952 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2235436,
            "unit": "ns/op\t  946969 B/op\t   10033 allocs/op",
            "extra": "523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2235436,
            "unit": "ns/op",
            "extra": "523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946969,
            "unit": "B/op",
            "extra": "523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 23524517,
            "unit": "ns/op\t10211973 B/op\t  100040 allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 23524517,
            "unit": "ns/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211973,
            "unit": "B/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 5539352,
            "unit": "ns/op\t  236411 B/op\t    2352 allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 5539352,
            "unit": "ns/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 236411,
            "unit": "B/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2352,
            "unit": "allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 37538514,
            "unit": "ns/op\t  882656 B/op\t    6857 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 37538514,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 882656,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6857,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 343945428,
            "unit": "ns/op\t 8110309 B/op\t   52091 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 343945428,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 8110309,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52091,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 17497274,
            "unit": "ns/op\t10211986 B/op\t  100040 allocs/op",
            "extra": "80 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 17497274,
            "unit": "ns/op",
            "extra": "80 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211986,
            "unit": "B/op",
            "extra": "80 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "80 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.822,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "425252431 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.822,
            "unit": "ns/op",
            "extra": "425252431 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "425252431 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "425252431 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2024784,
            "unit": "ns/op\t 1760188 B/op\t   30006 allocs/op",
            "extra": "589 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2024784,
            "unit": "ns/op",
            "extra": "589 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760188,
            "unit": "B/op",
            "extra": "589 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "589 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1495389,
            "unit": "ns/op\t 1608298 B/op\t   20008 allocs/op",
            "extra": "786 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1495389,
            "unit": "ns/op",
            "extra": "786 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608298,
            "unit": "B/op",
            "extra": "786 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "786 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 600575,
            "unit": "ns/op\t 1368312 B/op\t       9 allocs/op",
            "extra": "1725 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 600575,
            "unit": "ns/op",
            "extra": "1725 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368312,
            "unit": "B/op",
            "extra": "1725 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1725 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1605721,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "739 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1605721,
            "unit": "ns/op",
            "extra": "739 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "739 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "739 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6333412,
            "unit": "ns/op\t 5383131 B/op\t   30619 allocs/op",
            "extra": "192 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6333412,
            "unit": "ns/op",
            "extra": "192 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5383131,
            "unit": "B/op",
            "extra": "192 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30619,
            "unit": "allocs/op",
            "extra": "192 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 16631732,
            "unit": "ns/op\t11776677 B/op\t   71339 allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 16631732,
            "unit": "ns/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11776677,
            "unit": "B/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71339,
            "unit": "allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 68592469,
            "unit": "ns/op\t24704274 B/op\t  188422 allocs/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 68592469,
            "unit": "ns/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24704274,
            "unit": "B/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188422,
            "unit": "allocs/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 37544693,
            "unit": "ns/op\t24700668 B/op\t  188420 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 37544693,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24700668,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188420,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "36189604020dd6c4ac5b186df7d6b4fe5916cc00",
          "message": "fix: gitignore claude local settings",
          "timestamp": "2026-05-06T19:24:18-04:00",
          "tree_id": "d103f17f09fcbab6d6a9c522bfc503a771ffab20",
          "url": "https://github.com/billdaws/bookmanager/commit/36189604020dd6c4ac5b186df7d6b4fe5916cc00"
        },
        "date": 1778109959257,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 276858,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "4561 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 276858,
            "unit": "ns/op",
            "extra": "4561 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "4561 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "4561 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2310397,
            "unit": "ns/op\t  946969 B/op\t   10033 allocs/op",
            "extra": "513 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2310397,
            "unit": "ns/op",
            "extra": "513 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946969,
            "unit": "B/op",
            "extra": "513 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "513 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 26016225,
            "unit": "ns/op\t10211962 B/op\t  100040 allocs/op",
            "extra": "54 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 26016225,
            "unit": "ns/op",
            "extra": "54 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211962,
            "unit": "B/op",
            "extra": "54 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "54 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 6210018,
            "unit": "ns/op\t  247010 B/op\t    2352 allocs/op",
            "extra": "190 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 6210018,
            "unit": "ns/op",
            "extra": "190 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 247010,
            "unit": "B/op",
            "extra": "190 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2352,
            "unit": "allocs/op",
            "extra": "190 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 37097655,
            "unit": "ns/op\t  882696 B/op\t    6857 allocs/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 37097655,
            "unit": "ns/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 882696,
            "unit": "B/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6857,
            "unit": "allocs/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 328168892,
            "unit": "ns/op\t 8110176 B/op\t   52091 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 328168892,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 8110176,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52091,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 15355217,
            "unit": "ns/op\t10211982 B/op\t  100040 allocs/op",
            "extra": "80 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 15355217,
            "unit": "ns/op",
            "extra": "80 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211982,
            "unit": "B/op",
            "extra": "80 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "80 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.504,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "480497385 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.504,
            "unit": "ns/op",
            "extra": "480497385 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "480497385 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "480497385 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2009265,
            "unit": "ns/op\t 1760189 B/op\t   30006 allocs/op",
            "extra": "612 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2009265,
            "unit": "ns/op",
            "extra": "612 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760189,
            "unit": "B/op",
            "extra": "612 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "612 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1663298,
            "unit": "ns/op\t 1608298 B/op\t   20008 allocs/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1663298,
            "unit": "ns/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608298,
            "unit": "B/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 714912,
            "unit": "ns/op\t 1368312 B/op\t       9 allocs/op",
            "extra": "1474 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 714912,
            "unit": "ns/op",
            "extra": "1474 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368312,
            "unit": "B/op",
            "extra": "1474 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1474 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1806434,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "682 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1806434,
            "unit": "ns/op",
            "extra": "682 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "682 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "682 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6776570,
            "unit": "ns/op\t 5383296 B/op\t   30621 allocs/op",
            "extra": "180 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6776570,
            "unit": "ns/op",
            "extra": "180 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5383296,
            "unit": "B/op",
            "extra": "180 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30621,
            "unit": "allocs/op",
            "extra": "180 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 16335414,
            "unit": "ns/op\t11777695 B/op\t   71340 allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 16335414,
            "unit": "ns/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11777695,
            "unit": "B/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71340,
            "unit": "allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 61354828,
            "unit": "ns/op\t24704547 B/op\t  188423 allocs/op",
            "extra": "18 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 61354828,
            "unit": "ns/op",
            "extra": "18 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24704547,
            "unit": "B/op",
            "extra": "18 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188423,
            "unit": "allocs/op",
            "extra": "18 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 37798436,
            "unit": "ns/op\t24700646 B/op\t  188416 allocs/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 37798436,
            "unit": "ns/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24700646,
            "unit": "B/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188416,
            "unit": "allocs/op",
            "extra": "32 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "802740b7e6dd7dded75cee21950289822752a469",
          "message": "docs: update backlog",
          "timestamp": "2026-05-06T19:25:29-04:00",
          "tree_id": "08c9bc989bfd65fee052e3df7aa627c246a42684",
          "url": "https://github.com/billdaws/bookmanager/commit/802740b7e6dd7dded75cee21950289822752a469"
        },
        "date": 1778110019914,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 248980,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "4969 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 248980,
            "unit": "ns/op",
            "extra": "4969 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "4969 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "4969 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2307026,
            "unit": "ns/op\t  946969 B/op\t   10033 allocs/op",
            "extra": "517 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2307026,
            "unit": "ns/op",
            "extra": "517 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946969,
            "unit": "B/op",
            "extra": "517 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "517 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 24745643,
            "unit": "ns/op\t10211959 B/op\t  100040 allocs/op",
            "extra": "56 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 24745643,
            "unit": "ns/op",
            "extra": "56 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211959,
            "unit": "B/op",
            "extra": "56 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "56 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 5517356,
            "unit": "ns/op\t  237488 B/op\t    2352 allocs/op",
            "extra": "213 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 5517356,
            "unit": "ns/op",
            "extra": "213 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 237488,
            "unit": "B/op",
            "extra": "213 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2352,
            "unit": "allocs/op",
            "extra": "213 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 37518818,
            "unit": "ns/op\t  882660 B/op\t    6857 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 37518818,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 882660,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6857,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 345126332,
            "unit": "ns/op\t 8109565 B/op\t   52089 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 345126332,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 8109565,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52089,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 15235838,
            "unit": "ns/op\t10211979 B/op\t  100040 allocs/op",
            "extra": "75 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 15235838,
            "unit": "ns/op",
            "extra": "75 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211979,
            "unit": "B/op",
            "extra": "75 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "75 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.884,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "423508524 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.884,
            "unit": "ns/op",
            "extra": "423508524 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "423508524 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "423508524 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2014420,
            "unit": "ns/op\t 1760189 B/op\t   30006 allocs/op",
            "extra": "576 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2014420,
            "unit": "ns/op",
            "extra": "576 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760189,
            "unit": "B/op",
            "extra": "576 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "576 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1686993,
            "unit": "ns/op\t 1608298 B/op\t   20008 allocs/op",
            "extra": "727 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1686993,
            "unit": "ns/op",
            "extra": "727 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608298,
            "unit": "B/op",
            "extra": "727 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "727 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 565108,
            "unit": "ns/op\t 1368312 B/op\t       9 allocs/op",
            "extra": "1886 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 565108,
            "unit": "ns/op",
            "extra": "1886 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368312,
            "unit": "B/op",
            "extra": "1886 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1886 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1585614,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1585614,
            "unit": "ns/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6626634,
            "unit": "ns/op\t 5383747 B/op\t   30622 allocs/op",
            "extra": "178 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6626634,
            "unit": "ns/op",
            "extra": "178 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5383747,
            "unit": "B/op",
            "extra": "178 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30622,
            "unit": "allocs/op",
            "extra": "178 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 16406213,
            "unit": "ns/op\t11777967 B/op\t   71340 allocs/op",
            "extra": "67 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 16406213,
            "unit": "ns/op",
            "extra": "67 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11777967,
            "unit": "B/op",
            "extra": "67 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71340,
            "unit": "allocs/op",
            "extra": "67 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 63155104,
            "unit": "ns/op\t24704695 B/op\t  188424 allocs/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 63155104,
            "unit": "ns/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24704695,
            "unit": "B/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188424,
            "unit": "allocs/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 36833607,
            "unit": "ns/op\t24701131 B/op\t  188416 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 36833607,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24701131,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188416,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "d15ff3c16d296ba092b8ad4735786b7c09174336",
          "message": "fix: ignore plans",
          "timestamp": "2026-05-06T19:26:50-04:00",
          "tree_id": "db47cdc5591d7d1f2dae8aed3109d14ca3e888dc",
          "url": "https://github.com/billdaws/bookmanager/commit/d15ff3c16d296ba092b8ad4735786b7c09174336"
        },
        "date": 1778110100797,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 304836,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "3765 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 304836,
            "unit": "ns/op",
            "extra": "3765 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "3765 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "3765 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2374459,
            "unit": "ns/op\t  946970 B/op\t   10033 allocs/op",
            "extra": "514 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2374459,
            "unit": "ns/op",
            "extra": "514 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946970,
            "unit": "B/op",
            "extra": "514 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "514 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 28149708,
            "unit": "ns/op\t10211965 B/op\t  100040 allocs/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 28149708,
            "unit": "ns/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211965,
            "unit": "B/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 5750205,
            "unit": "ns/op\t  261034 B/op\t    2352 allocs/op",
            "extra": "205 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 5750205,
            "unit": "ns/op",
            "extra": "205 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 261034,
            "unit": "B/op",
            "extra": "205 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2352,
            "unit": "allocs/op",
            "extra": "205 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 35424890,
            "unit": "ns/op\t  882694 B/op\t    6857 allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 35424890,
            "unit": "ns/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 882694,
            "unit": "B/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6857,
            "unit": "allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 326210732,
            "unit": "ns/op\t 8109992 B/op\t   52090 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 326210732,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 8109992,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52090,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 14970558,
            "unit": "ns/op\t10211986 B/op\t  100040 allocs/op",
            "extra": "78 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 14970558,
            "unit": "ns/op",
            "extra": "78 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211986,
            "unit": "B/op",
            "extra": "78 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "78 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.496,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "480207220 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.496,
            "unit": "ns/op",
            "extra": "480207220 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "480207220 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "480207220 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2018226,
            "unit": "ns/op\t 1760189 B/op\t   30006 allocs/op",
            "extra": "576 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2018226,
            "unit": "ns/op",
            "extra": "576 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760189,
            "unit": "B/op",
            "extra": "576 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "576 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1580148,
            "unit": "ns/op\t 1608299 B/op\t   20008 allocs/op",
            "extra": "752 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1580148,
            "unit": "ns/op",
            "extra": "752 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608299,
            "unit": "B/op",
            "extra": "752 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "752 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 704782,
            "unit": "ns/op\t 1368312 B/op\t       9 allocs/op",
            "extra": "1662 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 704782,
            "unit": "ns/op",
            "extra": "1662 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368312,
            "unit": "B/op",
            "extra": "1662 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1662 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1655924,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "724 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1655924,
            "unit": "ns/op",
            "extra": "724 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "724 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "724 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6772719,
            "unit": "ns/op\t 5384055 B/op\t   30623 allocs/op",
            "extra": "175 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6772719,
            "unit": "ns/op",
            "extra": "175 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5384055,
            "unit": "B/op",
            "extra": "175 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30623,
            "unit": "allocs/op",
            "extra": "175 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 15679333,
            "unit": "ns/op\t11777789 B/op\t   71339 allocs/op",
            "extra": "76 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 15679333,
            "unit": "ns/op",
            "extra": "76 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11777789,
            "unit": "B/op",
            "extra": "76 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71339,
            "unit": "allocs/op",
            "extra": "76 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 61445603,
            "unit": "ns/op\t24704336 B/op\t  188423 allocs/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 61445603,
            "unit": "ns/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24704336,
            "unit": "B/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188423,
            "unit": "allocs/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 36267673,
            "unit": "ns/op\t24699145 B/op\t  188418 allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 36267673,
            "unit": "ns/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24699145,
            "unit": "B/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188418,
            "unit": "allocs/op",
            "extra": "33 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "1ee2b3facad1ba29f3e9823814ee0c4791a6dae5",
          "message": "fix: filtering not applying to series",
          "timestamp": "2026-05-06T19:36:05-04:00",
          "tree_id": "a70c40c0ced655c128880c584f446a81aeb24617",
          "url": "https://github.com/billdaws/bookmanager/commit/1ee2b3facad1ba29f3e9823814ee0c4791a6dae5"
        },
        "date": 1778110651800,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 254891,
            "unit": "ns/op\t   86008 B/op\t    1029 allocs/op",
            "extra": "4744 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 254891,
            "unit": "ns/op",
            "extra": "4744 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86008,
            "unit": "B/op",
            "extra": "4744 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "4744 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2316048,
            "unit": "ns/op\t  946969 B/op\t   10033 allocs/op",
            "extra": "505 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2316048,
            "unit": "ns/op",
            "extra": "505 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946969,
            "unit": "B/op",
            "extra": "505 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "505 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 23673138,
            "unit": "ns/op\t10211966 B/op\t  100040 allocs/op",
            "extra": "56 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 23673138,
            "unit": "ns/op",
            "extra": "56 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211966,
            "unit": "B/op",
            "extra": "56 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "56 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 5608084,
            "unit": "ns/op\t  237446 B/op\t    2352 allocs/op",
            "extra": "213 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 5608084,
            "unit": "ns/op",
            "extra": "213 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 237446,
            "unit": "B/op",
            "extra": "213 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2352,
            "unit": "allocs/op",
            "extra": "213 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 37210097,
            "unit": "ns/op\t  882689 B/op\t    6857 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 37210097,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 882689,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6857,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 345388625,
            "unit": "ns/op\t 8109682 B/op\t   52090 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 345388625,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 8109682,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52090,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 14770961,
            "unit": "ns/op\t10211977 B/op\t  100040 allocs/op",
            "extra": "82 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 14770961,
            "unit": "ns/op",
            "extra": "82 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211977,
            "unit": "B/op",
            "extra": "82 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "82 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.818,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "425368496 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.818,
            "unit": "ns/op",
            "extra": "425368496 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "425368496 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "425368496 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2029669,
            "unit": "ns/op\t 1760189 B/op\t   30006 allocs/op",
            "extra": "561 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2029669,
            "unit": "ns/op",
            "extra": "561 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760189,
            "unit": "B/op",
            "extra": "561 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "561 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1498082,
            "unit": "ns/op\t 1608298 B/op\t   20008 allocs/op",
            "extra": "795 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1498082,
            "unit": "ns/op",
            "extra": "795 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608298,
            "unit": "B/op",
            "extra": "795 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "795 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 565262,
            "unit": "ns/op\t 1368312 B/op\t       9 allocs/op",
            "extra": "1785 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 565262,
            "unit": "ns/op",
            "extra": "1785 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368312,
            "unit": "B/op",
            "extra": "1785 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1785 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1576855,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "726 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1576855,
            "unit": "ns/op",
            "extra": "726 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "726 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "726 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6510636,
            "unit": "ns/op\t 5382743 B/op\t   30619 allocs/op",
            "extra": "189 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6510636,
            "unit": "ns/op",
            "extra": "189 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5382743,
            "unit": "B/op",
            "extra": "189 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30619,
            "unit": "allocs/op",
            "extra": "189 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 17307921,
            "unit": "ns/op\t11776017 B/op\t   71338 allocs/op",
            "extra": "68 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 17307921,
            "unit": "ns/op",
            "extra": "68 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11776017,
            "unit": "B/op",
            "extra": "68 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71338,
            "unit": "allocs/op",
            "extra": "68 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 62186759,
            "unit": "ns/op\t24704518 B/op\t  188423 allocs/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 62186759,
            "unit": "ns/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24704518,
            "unit": "B/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188423,
            "unit": "allocs/op",
            "extra": "20 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 36810380,
            "unit": "ns/op\t24700972 B/op\t  188417 allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 36810380,
            "unit": "ns/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24700972,
            "unit": "B/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188417,
            "unit": "allocs/op",
            "extra": "33 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "b8d2c435b09a1de205d6bc0f0eed01f5c1ba288e",
          "message": "build: add gotestfmt to make test-e2e",
          "timestamp": "2026-05-06T19:38:55-04:00",
          "tree_id": "f9aa3ed92c985c4c1a6517516c41e1beeae3d91e",
          "url": "https://github.com/billdaws/bookmanager/commit/b8d2c435b09a1de205d6bc0f0eed01f5c1ba288e"
        },
        "date": 1778110820738,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 316817,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "3705 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 316817,
            "unit": "ns/op",
            "extra": "3705 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "3705 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "3705 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2957926,
            "unit": "ns/op\t  946968 B/op\t   10033 allocs/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2957926,
            "unit": "ns/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946968,
            "unit": "B/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 30456470,
            "unit": "ns/op\t10211975 B/op\t  100040 allocs/op",
            "extra": "40 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 30456470,
            "unit": "ns/op",
            "extra": "40 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211975,
            "unit": "B/op",
            "extra": "40 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "40 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4608319,
            "unit": "ns/op\t  225037 B/op\t    2352 allocs/op",
            "extra": "253 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4608319,
            "unit": "ns/op",
            "extra": "253 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 225037,
            "unit": "B/op",
            "extra": "253 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2352,
            "unit": "allocs/op",
            "extra": "253 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 40535169,
            "unit": "ns/op\t 1032475 B/op\t    6857 allocs/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 40535169,
            "unit": "ns/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 1032475,
            "unit": "B/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6857,
            "unit": "allocs/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 366409719,
            "unit": "ns/op\t13703834 B/op\t   52099 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 366409719,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 13703834,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52099,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 17944648,
            "unit": "ns/op\t10211987 B/op\t  100040 allocs/op",
            "extra": "63 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 17944648,
            "unit": "ns/op",
            "extra": "63 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211987,
            "unit": "B/op",
            "extra": "63 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "63 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.17,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "552663314 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.17,
            "unit": "ns/op",
            "extra": "552663314 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "552663314 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "552663314 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2017788,
            "unit": "ns/op\t 1760180 B/op\t   30006 allocs/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2017788,
            "unit": "ns/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760180,
            "unit": "B/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1409998,
            "unit": "ns/op\t 1608298 B/op\t   20008 allocs/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1409998,
            "unit": "ns/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608298,
            "unit": "B/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 640528,
            "unit": "ns/op\t 1368315 B/op\t       9 allocs/op",
            "extra": "1809 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 640528,
            "unit": "ns/op",
            "extra": "1809 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368315,
            "unit": "B/op",
            "extra": "1809 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1809 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1563316,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "788 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1563316,
            "unit": "ns/op",
            "extra": "788 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "788 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "788 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6531626,
            "unit": "ns/op\t 5383484 B/op\t   30621 allocs/op",
            "extra": "178 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6531626,
            "unit": "ns/op",
            "extra": "178 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5383484,
            "unit": "B/op",
            "extra": "178 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30621,
            "unit": "allocs/op",
            "extra": "178 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 16092635,
            "unit": "ns/op\t11777054 B/op\t   71340 allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 16092635,
            "unit": "ns/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11777054,
            "unit": "B/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71340,
            "unit": "allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 64661472,
            "unit": "ns/op\t24704203 B/op\t  188423 allocs/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 64661472,
            "unit": "ns/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24704203,
            "unit": "B/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188423,
            "unit": "allocs/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 39041660,
            "unit": "ns/op\t24701211 B/op\t  188415 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 39041660,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24701211,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188415,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "737fde9b2d1bfc410261a4f4ee3b15f6860269a6",
          "message": "feat: comics with metadata and series discovery via files, comicvine, and confidence matching",
          "timestamp": "2026-05-07T16:41:32-04:00",
          "tree_id": "f2f56d9ee11246fda80daaede22b0c94cc858141",
          "url": "https://github.com/billdaws/bookmanager/commit/737fde9b2d1bfc410261a4f4ee3b15f6860269a6"
        },
        "date": 1778186572329,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books",
            "value": 282908,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "4372 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books - ns/op",
            "value": 282908,
            "unit": "ns/op",
            "extra": "4372 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "4372 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "4372 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books",
            "value": 2450910,
            "unit": "ns/op\t  946969 B/op\t   10033 allocs/op",
            "extra": "500 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books - ns/op",
            "value": 2450910,
            "unit": "ns/op",
            "extra": "500 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books - B/op",
            "value": 946969,
            "unit": "B/op",
            "extra": "500 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "500 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books",
            "value": 24863630,
            "unit": "ns/op\t10211963 B/op\t  100040 allocs/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books - ns/op",
            "value": 24863630,
            "unit": "ns/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books - B/op",
            "value": 10211963,
            "unit": "B/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "55 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books",
            "value": 7776471,
            "unit": "ns/op\t  310120 B/op\t    2800 allocs/op",
            "extra": "156 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books - ns/op",
            "value": 7776471,
            "unit": "ns/op",
            "extra": "156 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books - B/op",
            "value": 310120,
            "unit": "B/op",
            "extra": "156 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books - allocs/op",
            "value": 2800,
            "unit": "allocs/op",
            "extra": "156 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books",
            "value": 38016983,
            "unit": "ns/op\t  899625 B/op\t    7305 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books - ns/op",
            "value": 38016983,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books - B/op",
            "value": 899625,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books - allocs/op",
            "value": 7305,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books",
            "value": 334449792,
            "unit": "ns/op\t 8128136 B/op\t   52538 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books - ns/op",
            "value": 334449792,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books - B/op",
            "value": 8128136,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books - allocs/op",
            "value": 52538,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent",
            "value": 15813600,
            "unit": "ns/op\t10211992 B/op\t  100040 allocs/op",
            "extra": "66 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent - ns/op",
            "value": 15813600,
            "unit": "ns/op",
            "extra": "66 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent - B/op",
            "value": 10211992,
            "unit": "B/op",
            "extra": "66 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "66 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "0e77a1f6bf0483f628425948778ac945c4edfda8",
          "message": "feat: comics with metadata and series discovery via files, comicvine, and confidence matching",
          "timestamp": "2026-05-07T16:43:05-04:00",
          "tree_id": "3e48938fb2257b1868df0a4cc54e9737885d70f8",
          "url": "https://github.com/billdaws/bookmanager/commit/0e77a1f6bf0483f628425948778ac945c4edfda8"
        },
        "date": 1778186676910,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books",
            "value": 277830,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "4216 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books - ns/op",
            "value": 277830,
            "unit": "ns/op",
            "extra": "4216 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "4216 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "4216 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books",
            "value": 2402460,
            "unit": "ns/op\t  946969 B/op\t   10033 allocs/op",
            "extra": "496 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books - ns/op",
            "value": 2402460,
            "unit": "ns/op",
            "extra": "496 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books - B/op",
            "value": 946969,
            "unit": "B/op",
            "extra": "496 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "496 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books",
            "value": 24576374,
            "unit": "ns/op\t10211973 B/op\t  100040 allocs/op",
            "extra": "52 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books - ns/op",
            "value": 24576374,
            "unit": "ns/op",
            "extra": "52 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books - B/op",
            "value": 10211973,
            "unit": "B/op",
            "extra": "52 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "52 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books",
            "value": 7484800,
            "unit": "ns/op\t  280577 B/op\t    2800 allocs/op",
            "extra": "160 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books - ns/op",
            "value": 7484800,
            "unit": "ns/op",
            "extra": "160 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books - B/op",
            "value": 280577,
            "unit": "B/op",
            "extra": "160 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books - allocs/op",
            "value": 2800,
            "unit": "allocs/op",
            "extra": "160 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books",
            "value": 37746108,
            "unit": "ns/op\t  899626 B/op\t    7305 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books - ns/op",
            "value": 37746108,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books - B/op",
            "value": 899626,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books - allocs/op",
            "value": 7305,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books",
            "value": 329846084,
            "unit": "ns/op\t 8128168 B/op\t   52538 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books - ns/op",
            "value": 329846084,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books - B/op",
            "value": 8128168,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books - allocs/op",
            "value": 52538,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent",
            "value": 17845595,
            "unit": "ns/op\t10211986 B/op\t  100040 allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent - ns/op",
            "value": 17845595,
            "unit": "ns/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent - B/op",
            "value": 10211986,
            "unit": "B/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "74 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "592b78b7b00a3900d1ec180bba44de5223af67f4",
          "message": "feat: comics with metadata and series discovery via files, comicvine, and confidence matching",
          "timestamp": "2026-05-07T16:47:34-04:00",
          "tree_id": "e5acecbcf4e06dc617faaabf056ce37f345b7b1c",
          "url": "https://github.com/billdaws/bookmanager/commit/592b78b7b00a3900d1ec180bba44de5223af67f4"
        },
        "date": 1778186950959,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 270312,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "4524 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 270312,
            "unit": "ns/op",
            "extra": "4524 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "4524 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "4524 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2340359,
            "unit": "ns/op\t  946969 B/op\t   10033 allocs/op",
            "extra": "500 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2340359,
            "unit": "ns/op",
            "extra": "500 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946969,
            "unit": "B/op",
            "extra": "500 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "500 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 23596615,
            "unit": "ns/op\t10211960 B/op\t  100040 allocs/op",
            "extra": "52 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 23596615,
            "unit": "ns/op",
            "extra": "52 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211960,
            "unit": "B/op",
            "extra": "52 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "52 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 7350822,
            "unit": "ns/op\t  279196 B/op\t    2800 allocs/op",
            "extra": "162 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 7350822,
            "unit": "ns/op",
            "extra": "162 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 279196,
            "unit": "B/op",
            "extra": "162 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2800,
            "unit": "allocs/op",
            "extra": "162 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 37393649,
            "unit": "ns/op\t  899634 B/op\t    7305 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 37393649,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 899634,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 7305,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 329071178,
            "unit": "ns/op\t 8127010 B/op\t   52538 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 329071178,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 8127010,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52538,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16608794,
            "unit": "ns/op\t10211985 B/op\t  100040 allocs/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16608794,
            "unit": "ns/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211985,
            "unit": "B/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.507,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "480041176 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.507,
            "unit": "ns/op",
            "extra": "480041176 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "480041176 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "480041176 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2033071,
            "unit": "ns/op\t 1760189 B/op\t   30006 allocs/op",
            "extra": "586 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2033071,
            "unit": "ns/op",
            "extra": "586 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760189,
            "unit": "B/op",
            "extra": "586 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "586 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1541309,
            "unit": "ns/op\t 1608299 B/op\t   20008 allocs/op",
            "extra": "783 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1541309,
            "unit": "ns/op",
            "extra": "783 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608299,
            "unit": "B/op",
            "extra": "783 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "783 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 615554,
            "unit": "ns/op\t 1368312 B/op\t       9 allocs/op",
            "extra": "1665 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 615554,
            "unit": "ns/op",
            "extra": "1665 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368312,
            "unit": "B/op",
            "extra": "1665 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1665 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1662602,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "680 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1662602,
            "unit": "ns/op",
            "extra": "680 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "680 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "680 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6376617,
            "unit": "ns/op\t 5381809 B/op\t   30634 allocs/op",
            "extra": "189 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6376617,
            "unit": "ns/op",
            "extra": "189 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5381809,
            "unit": "B/op",
            "extra": "189 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30634,
            "unit": "allocs/op",
            "extra": "189 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 16085428,
            "unit": "ns/op\t11773987 B/op\t   71356 allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 16085428,
            "unit": "ns/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11773987,
            "unit": "B/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71356,
            "unit": "allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 68327029,
            "unit": "ns/op\t24699977 B/op\t  188437 allocs/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 68327029,
            "unit": "ns/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24699977,
            "unit": "B/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188437,
            "unit": "allocs/op",
            "extra": "19 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 37887361,
            "unit": "ns/op\t24692875 B/op\t  188431 allocs/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 37887361,
            "unit": "ns/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24692875,
            "unit": "B/op",
            "extra": "31 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188431,
            "unit": "allocs/op",
            "extra": "31 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "cd32f59986e8b238a011fbc5a86b3197b5872092",
          "message": "fix: e2e test bugs and gotestfmt invocation\n\n1. internal/e2e/library_test.go — TestMetadataBackfill\n\nThe last commit added CBZ/CBR files to testdata, which sort alphabetically before the\nepub files. files[0] became Astounding Comics 01.cbz, which has no embedded\nauthor/title — so after metadata backfill its display never changes from filename, and\n the 60s MustWait timed out. The repanic from that timeout killed the entire test\nprocess, causing all other parallel tests to show 0s.\n\nFix: find the first .epub in the files list instead of using files[0].\n\n2. internal/e2e/testdata/generate/main.go — CRC fix\n\nThe generator computed a genuine CRC-16 (polynomial 0x8005, MSB-first). rardecode\nvalidates RAR4 block headers using uint16(crc32.ChecksumIEEE(...)) — the low 16 bits\nof CRC-32. Wrong checksum → errBadHeaderCrc on every block → OpenReader/Next() failed\n→ no covers found.\n\nFix: replaced the custom crc16 function with blockCRC using\nuint16(crc32.ChecksumIEEE(data)).\n\n3. internal/e2e/testdata/generate/main.go — HEAD_FLAGS fix\n\nThe file header had HEAD_FLAGS = 0x0000. Without the blockHasData flag (0x8000),\nrardecode does not consume PACK_SIZE from the header buffer before calling\nparseFileHeader. Every subsequent field read is shifted 4 bytes early: NAME_SIZE ends\nup reading from FTIME's bytes (0), so f.Name = \"\" and isImageFile(\"\") returns false —\nno covers found.\n\nFix: set HEAD_FLAGS = 0x8000.\n\nAfter both generator fixes, the three CBR test fixtures were regenerated.",
          "timestamp": "2026-05-09T17:31:10-04:00",
          "tree_id": "d7f83946ca540115e10ed0c11eebcf2325753cc8",
          "url": "https://github.com/billdaws/bookmanager/commit/cd32f59986e8b238a011fbc5a86b3197b5872092"
        },
        "date": 1778362441906,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 313557,
            "unit": "ns/op\t   86009 B/op\t    1029 allocs/op",
            "extra": "3514 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 313557,
            "unit": "ns/op",
            "extra": "3514 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 86009,
            "unit": "B/op",
            "extra": "3514 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1029,
            "unit": "allocs/op",
            "extra": "3514 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2970661,
            "unit": "ns/op\t  946969 B/op\t   10033 allocs/op",
            "extra": "411 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2970661,
            "unit": "ns/op",
            "extra": "411 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 946969,
            "unit": "B/op",
            "extra": "411 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 10033,
            "unit": "allocs/op",
            "extra": "411 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 30289991,
            "unit": "ns/op\t10212003 B/op\t  100040 allocs/op",
            "extra": "42 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 30289991,
            "unit": "ns/op",
            "extra": "42 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10212003,
            "unit": "B/op",
            "extra": "42 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "42 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 5421000,
            "unit": "ns/op\t  254021 B/op\t    2800 allocs/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 5421000,
            "unit": "ns/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 254021,
            "unit": "B/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 2800,
            "unit": "allocs/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 40764425,
            "unit": "ns/op\t  899604 B/op\t    7305 allocs/op",
            "extra": "30 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 40764425,
            "unit": "ns/op",
            "extra": "30 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 899604,
            "unit": "B/op",
            "extra": "30 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 7305,
            "unit": "allocs/op",
            "extra": "30 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 362283542,
            "unit": "ns/op\t 8126509 B/op\t   52537 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 362283542,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 8126509,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 52537,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 18496451,
            "unit": "ns/op\t10211988 B/op\t  100040 allocs/op",
            "extra": "64 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 18496451,
            "unit": "ns/op",
            "extra": "64 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 10211988,
            "unit": "B/op",
            "extra": "64 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 100040,
            "unit": "allocs/op",
            "extra": "64 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.175,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "548847264 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.175,
            "unit": "ns/op",
            "extra": "548847264 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "548847264 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "548847264 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2042541,
            "unit": "ns/op\t 1760179 B/op\t   30006 allocs/op",
            "extra": "597 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2042541,
            "unit": "ns/op",
            "extra": "597 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1760179,
            "unit": "B/op",
            "extra": "597 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "597 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1420156,
            "unit": "ns/op\t 1608298 B/op\t   20008 allocs/op",
            "extra": "859 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1420156,
            "unit": "ns/op",
            "extra": "859 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1608298,
            "unit": "B/op",
            "extra": "859 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "859 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 664919,
            "unit": "ns/op\t 1368312 B/op\t       9 allocs/op",
            "extra": "1593 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 664919,
            "unit": "ns/op",
            "extra": "1593 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1368312,
            "unit": "B/op",
            "extra": "1593 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1593 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1706930,
            "unit": "ns/op\t 1688312 B/op\t   20009 allocs/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1706930,
            "unit": "ns/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1688312,
            "unit": "B/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6735309,
            "unit": "ns/op\t 5384404 B/op\t   30638 allocs/op",
            "extra": "168 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6735309,
            "unit": "ns/op",
            "extra": "168 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5384404,
            "unit": "B/op",
            "extra": "168 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30638,
            "unit": "allocs/op",
            "extra": "168 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 16301000,
            "unit": "ns/op\t11776840 B/op\t   71352 allocs/op",
            "extra": "76 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 16301000,
            "unit": "ns/op",
            "extra": "76 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 11776840,
            "unit": "B/op",
            "extra": "76 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 71352,
            "unit": "allocs/op",
            "extra": "76 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 64455808,
            "unit": "ns/op\t24705034 B/op\t  188437 allocs/op",
            "extra": "18 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 64455808,
            "unit": "ns/op",
            "extra": "18 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24705034,
            "unit": "B/op",
            "extra": "18 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188437,
            "unit": "allocs/op",
            "extra": "18 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 40818258,
            "unit": "ns/op\t24701291 B/op\t  188430 allocs/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 40818258,
            "unit": "ns/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 24701291,
            "unit": "B/op",
            "extra": "27 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 188430,
            "unit": "allocs/op",
            "extra": "27 times\n2 procs"
          }
        ]
      }
    ]
  }
}